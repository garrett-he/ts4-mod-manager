import {ipcRenderer, contextBridge} from "electron";
import {Mod} from "ts4mm/types";

contextBridge.exposeInMainWorld("$api", {
    discoverMods: async (): Promise<Mod[]> => ipcRenderer.invoke("discoverMods"),
});
