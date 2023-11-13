import fs from "fs-extra";
import path from "node:path";
import {Mod, ModInfo} from "ts4mm/types";
import {globSync} from "glob";

function loadMod(dir: string): Mod {
    const infoFile = path.resolve(dir, "info.json");
    const thumbnailFile = path.resolve(dir, "thumbnail.png");

    return <Mod>{
        id: path.basename(dir),
        dir,
        info: fs.existsSync(infoFile) ? <ModInfo>fs.readJSONSync(infoFile) : undefined,
        thumbnail: fs.existsSync(thumbnailFile) ? thumbnailFile : undefined,
        screenshots: globSync(path.join(dir, "screenshots/**/*"), {windowsPathsNoEscape: true}),
    };
}

export function discoverMods(dir: string): Mod[] {
    return fs.readdirSync(dir, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => loadMod(path.resolve(dir, dirent.name)));
}
