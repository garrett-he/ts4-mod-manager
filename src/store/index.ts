import {createStore} from "vuex";
import {Mod} from "ts4mm/types";

export default createStore({
    state: () => ({
        mods: <Mod[]>[],
    }),
    mutations: {
        updateMods: (state, mods: Mod[]) => {
            state.mods = mods;
        }
    }
});
