const DB_NAME = "CODEFORCES";
const STORE_NAME = "Problems";

interface DBinstance {
    id : string,
    name : string,
    url : string,
    rating : string,
    solved : boolean,
    time : number,
    tags : string[],
    note : string,
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

export const addItem = async (item: Partial<DBinstance>): Promise<void> => {
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

export const updateSolved = async (id: string, solved: boolean): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
        const item = getRequest.result;
        if (!item) return reject(new Error(`Item with ID ${id} not found`));

            item.solved = solved;
            const updateRequest = store.put(item);

            updateRequest.onsuccess = () => resolve();
            updateRequest.onerror = () => reject(updateRequest.error);
        };

        getRequest.onerror = () => reject(getRequest.error);
    });
};

export const updateTime = async (id: string, time: number): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
            const item = getRequest.result;
            if (!item) return reject(new Error(`Item with ID ${id} not found`));

            item.time = time;
            const updateRequest = store.put(item);

            updateRequest.onsuccess = () => resolve();
            updateRequest.onerror = () => reject(updateRequest.error);
        };

        getRequest.onerror = () => reject(getRequest.error);
    });
};

export const updateTags = async (id: string, newTags: string[]): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
            const item = getRequest.result;
            if (!item) return reject(new Error(`Item with ID ${id} not found`));

            const existingTags: string[] = Array.isArray(item.tags) ? item.tags : [];
            const incomingTags: string[] = Array.isArray(newTags) ? newTags : [];

            const updatedTags = Array.from(new Set([...existingTags, ...incomingTags]));

            item.tags = updatedTags;
            const updateRequest = store.put(item);

            updateRequest.onsuccess = () => resolve();
            updateRequest.onerror = () => reject(updateRequest.error);
        };

        getRequest.onerror = () => reject(getRequest.error);
    });
};


export const updateNote = async (id: string, note: string): Promise<void> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
            const item = getRequest.result;
            if (!item) return reject(new Error(`Item with ID ${id} not found`));

            item.note = note;
            const updateRequest = store.put(item);

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

export const getProblems = async (): Promise<any[]> => {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const allProblems: any[] = [];
    
        return new Promise((resolve, reject) => {
            store.openCursor().onsuccess = (event) => {
                const cursor = (event.target as IDBRequest).result;
                if (cursor) {
                    allProblems.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(allProblems);
                }
            };
    
            transaction.onerror = () => reject(transaction.error);
        });
    } catch (error) {
        console.error("Error accessing IndexedDB:", error);
        return [];
    }
};