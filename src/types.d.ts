declare module "ts4mm/types" {
    interface AppConfig {
        library: string;
        target: string;
    }

    interface Mod {
        id: string;
        dir: string;
        info?: ModInfo | undefined;
        thumbnail?: string | undefined;
        screenshots: string[];
        installed: boolean;
    }

    interface ModInfo {
        name: string;
        category: string;
        tags: string[];
        author?: string | undefined;
        version?: string | undefined;
        url?: string | undefined;
        description: string;
    }

    interface ModInstallLog {
        src: string;
        target: string;
    }
}
