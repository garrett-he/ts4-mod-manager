declare module "ts4mm/types" {
    interface AppConfig {
        library: string;
    }

    interface Mod {
        id: string;
        dir: string;
        info?: ModInfo | undefined;
        thumbnail?: string | undefined;
        screenshots: string[];
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
}
