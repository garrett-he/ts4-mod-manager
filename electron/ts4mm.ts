import fs from "fs-extra";
import path from "node:path";
import {Mod, ModInfo} from "ts4mm/types";

function loadMod(dir: string): Mod {
    const infoFile = path.resolve(dir, "info.json");

    return <Mod>{
        id: path.basename(dir),
        dir,
        info: fs.existsSync(infoFile) ? <ModInfo>fs.readJSONSync(infoFile) : undefined
    };
}

export function discoverMods(dir: string): Mod[] {
    return fs.readdirSync(dir, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => loadMod(path.resolve(dir, dirent.name)));
}
