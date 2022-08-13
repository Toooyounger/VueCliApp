import {createStore} from "vuex";
import menu from "@/store/modules/menu";
import vuexAlong from "vuex-along";
import user from "@/store/modules/user";
import doctor from "@/store/modules/doctor";
import hospital from "@/store/modules/Hospital"

const store = createStore({
    modules:{
        menu,
        user,
        doctor,
        hospital
    },
    plugins: [vuexAlong({
        name: 'navTree',
        local: {
            navTree: ["menu.navTree"]
        }
    })]
})
export default store