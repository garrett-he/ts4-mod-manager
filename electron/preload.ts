import {ipcRenderer, contextBridge} from "electron";
import {Mod} from "ts4mm/types";

contextBridge.exposeInMainWorld("$api", {
    discoverMods: async (): Promise<Mod[]> => ipcRenderer.invoke("discoverMods"),
    installMod: (mod: Mod): Promise<void> => ipcRenderer.invoke("installMod", mod),
    uninstallMod: (mod: Mod): Promise<void> => ipcRenderer.invoke("uninstallMod", mod),
    importMods: (): Promise<Mod[]> => ipcRenderer.invoke("importMods"),
    deleteMod: (mod: Mod): Promise<void> => ipcRenderer.invoke("deleteMod", mod),
    browseMod: (mod: Mod): Promise<void> => ipcRenderer.invoke("browseMod", mod),
    getModReadMe: (mod: Mod): Promise<string> => ipcRenderer.invoke("getModReadMe", mod)
});
