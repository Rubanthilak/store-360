import { ipcRenderer, contextBridge } from 'electron';

const nodeRequire = require; 
window.require = nodeRequire;

// Adds an object 'api' to the global window object:
contextBridge.exposeInMainWorld('api', {
    doAction: async (arg) => {
        return await ipcRenderer.invoke('an-action', arg);
    }
});