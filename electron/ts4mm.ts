import fs from "fs-extra";
import path from "node:path";
import {Mod, ModInfo, ModInstallLog} from "ts4mm/types";
import {globSync} from "glob";

const MOD_INSTALL_LOG_FILENAME = ".install-logs.json";

function loadMod(dir: string): Mod {
    const infoFile = path.resolve(dir, "info.json");
    const thumbnailFile = path.resolve(dir, "thumbnail.png");

    return <Mod>{
        id: path.basename(dir),
        dir,
        info: fs.existsSync(infoFile) ? <ModInfo>fs.readJSONSync(infoFile) : undefined,
        thumbnail: fs.existsSync(thumbnailFile) ? thumbnailFile : undefined,
        screenshots: globSync(path.join(dir, "screenshots/**/*"), {windowsPathsNoEscape: true}),
        installed: fs.existsSync(path.resolve(dir, MOD_INSTALL_LOG_FILENAME))
    };
}

export function discoverMods(dir: string): Mod[] {
    return fs.readdirSync(dir, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => loadMod(path.resolve(dir, dirent.name)));
}


function installModFiles(src: string, dest: string): ModInstallLog[] {
    if (!fs.existsSync(src)) {
        return [];
    }

    const copyFile = (src: string, target: string): ModInstallLog => {
        if (fs.existsSync(target)) {
            throw new Error(`File ${target} already exists.`);
        }

        fs.copyFileSync(src, target);

        return <ModInstallLog>{src, target};
    };

    if (fs.statSync(src).isFile()) {
        return [copyFile(src, dest)];
    }

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    let logs: ModInstallLog[] = [];

    fs.readdirSync(src).forEach(f => {
        const p = path.resolve(src, f);

        if (fs.statSync(p).isDirectory()) {
            logs = logs.concat(installModFiles(p, path.resolve(dest, f)));
        } else {
            logs.push(copyFile(p, path.resolve(dest, f)));
        }
    });

    return logs;
}

export function installMod(mod: Mod, target: string) {
    let logs: ModInstallLog[] = [];

    fs.readdirSync(path.resolve(mod.dir, "packages")).forEach(f => {
        logs = logs.concat(installModFiles(path.resolve(mod.dir, "packages", f), path.resolve(target, f)));
    });

    if (logs.length == 0) {
        throw new Error("No mod files are installed.");
    }

    fs.writeFileSync(path.resolve(mod.dir, MOD_INSTALL_LOG_FILENAME), JSON.stringify(logs));

    mod.installed = true;
}
