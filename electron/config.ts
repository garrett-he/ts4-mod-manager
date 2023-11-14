import fs from "fs";
import path from "path";
import {app} from "electron";
import ElectronStore from "electron-store";
import {AppConfig} from "ts4mm/types";

const config = new ElectronStore<AppConfig>({
    defaults: <AppConfig>{
        library: path.resolve(app.getPath("documents"), "TS4ModManager"),
        target: path.resolve(app.getPath("documents"), "Electronic Arts/The Sims 4")
    }
});

if (!fs.existsSync(config.get("library"))) {
    fs.mkdirSync(config.get("library"), {recursive: true});
}

export default config.store;
