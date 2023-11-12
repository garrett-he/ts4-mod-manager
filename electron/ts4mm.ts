import fs from "node:fs";
import path from "node:path";
import {Mod} from "ts4mm/types";

function loadMod(dir: string): Mod {
    return <Mod>{
        id: path.basename(dir),
        dir
    };
}

export function discoverMods(dir: string): Mod[] {
    return fs.readdirSync(dir, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => loadMod(path.resolve(dir, dirent.name)));
}
