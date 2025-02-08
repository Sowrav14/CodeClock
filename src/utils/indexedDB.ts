const DB_NAME = "CODEFORCES";
const STORE_NAME = "Problems";

interface DBinstance {
    id : string,
    name : string,
    rating : string,
    solved : boolean,
    time : number
}
export default DBinstance;

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (_event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const addItem = async (item: DBinstance): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.add(item);

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};

export const getItemById = async (id: string): Promise<any | undefined> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const updateItem = async (id: string, updatedData: DBinstance): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    // console.log("db opened");
    // Get the existing item
    const getRequest = store.get(id);
    console.log(getRequest);
    return new Promise((resolve, reject) => {
        getRequest.onsuccess = () => {
            const existingItem = getRequest.result;
            if (!existingItem) {
                // console.log("not exist");
                // return reject(new Error(`Item with ID ${id} not found`));
                addItem(updatedData);
            }
            // Update the item
            const updatedItem = {...updatedData};
            const updateRequest = store.put(updatedItem);
            // console.log("updating...", updateItem);
            updateRequest.onsuccess = () => resolve();
            updateRequest.onerror = () => reject(updateRequest.error);
        };
        getRequest.onerror = () => reject(getRequest.error);
    });
};

export const getSolvedProblems = async (): Promise<any[]> => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const solvedProblems: any[] = [];
    
        return new Promise((resolve, reject) => {
            store.openCursor().onsuccess = (event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor) {
                    if (cursor.value.solved === true) {
                        solvedProblems.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(solvedProblems);
                }
            };
    
            transaction.onerror = () => reject(transaction.error);
        });
    } catch (error) {
        console.error("Error accessing IndexedDB:", error);
        return [];
    }
};