1. npm create vite@latest select React Typescript + SWC
2. npm add -D vite-tsconfig-paths @crxjs/vite-plugin@beta
3. Add manifest.json at root 
4. configure vite.config.js
5. Create structure
    - src/popup/ app.tsx, main.tsx
    - src/contentScript/ app.tsx, main.tsx
    - src/background/background.ts
    - src/utils/indexedDB.ts
    - src/hooks/useExtension.ts
    - src/states/extensionState.ts
6. configure index.html imports,  popup/ tsx files (update imports) and content/ tsx files (create a new element to render)
7. configure manifest.json file accroding to your folder structure.
8. Test if all working ok?

9. edit popup to show what will be shown in extension popup
10. edit contentScript to interact with dom
11. build background for message passing