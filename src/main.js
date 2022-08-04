import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from "@/router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import api from "@/http/index";
import store from '@/store/index'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
    easing: 'ease',
    speed: 430,
    showSpinner: false,
    trickleSpeed: 150,
    minimum: 0.3
})

//路由监听
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

//路由跳转结束
router.afterEach(() => {
    NProgress.done()
});
import {faComputer,fa2, faAward, faBatteryThreeQuarters,faAppleWhole,faAngleDown,faDharmachakra,faAlignJustify,faAddressBook,faUser,faUsersLine,faSquarePen,faPencil,faFileLines,faCommentDots,faCity,faChevronUp} from "@fortawesome/free-solid-svg-icons";
library.add(faComputer,fa2,faBatteryThreeQuarters,faAward,faAppleWhole,faAngleDown,faDharmachakra,faAlignJustify,faAddressBook,faUser,faUsersLine,faSquarePen,faPencil,faFileLines,faCommentDots,faCity,faChevronUp)
createApp(App).use(router).use(store).use(api).use(ElementPlus).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
