import path from "node:path";
import fs from "fs-extra";
import {ipcMain, dialog, shell, OpenDialogSyncOptions} from "electron";
import {Mod} from "ts4mm/types";
import MarkdownIt from "markdown-it";
import {discoverMods, installMod, uninstallMod, importMod} from "./ts4mm";
import config from "./config";

ipcMain.handle("discoverMods", async (): Promise<Mod[]> => {
    return discoverMods(config["library"]);
});


ipcMain.handle("installMod", async (_, mod: Mod) => {
    installMod(mod, config["target"]);
});

ipcMain.handle("uninstallMod", async (_, mod: Mod) => {
    uninstallMod(mod);
});

ipcMain.handle("importMods", async (): Promise<Mod[]> => {
    const filePaths = dialog.showOpenDialogSync(<OpenDialogSyncOptions>{
        filters: [
            {name: "Mod Packages", extensions: ["zip", "tar.gz", "tgz"]},
            {name: "All Files", extensions: ["*"]}
        ],
        properties: ["openFile", "multiSelections"]
    });

    if (!filePaths) {
        return [];
    }

    return await filePaths.map(filePath => importMod(config["library"], filePath));
});

ipcMain.handle("browseMod", async (event, mod: Mod): Promise<string> => {
    return shell.openPath(mod.dir);
});

ipcMain.handle("getModReadMe", async (event, mod: Mod): Promise<string> => {
    const readmeFile = path.resolve(mod.dir, "README.md");

    if (!readmeFile) {
        return "N/A";
    }

    return (new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true
    })).render(fs.readFileSync(readmeFile).toString()).replace(/<img src="(.+)">/g, (match, $1) => {
        return `<img src="${path.resolve(mod.dir, $1)}" alt="">`;
    });
});
