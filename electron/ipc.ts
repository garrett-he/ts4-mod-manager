import {ipcMain} from "electron";
import {Mod} from "ts4mm/types";
import {discoverMods} from "./ts4mm";
import config from "./config";

ipcMain.handle("discoverMods", async (): Promise<Mod[]> => {
    return discoverMods(config["library"]);
});
