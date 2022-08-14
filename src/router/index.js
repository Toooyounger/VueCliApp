import Login from "@/views/Login";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import backView from "@/views/backView";
import ShouYe from "@/views/shouYe";
import yongHuGuanli from "@/views/yongHuGuanli";
import role from "@/views/role";
import detp from "@/views/detp";
import picShow from "@/views/PicShow";
import aricleList from "@/views/aricleList";
import aricleIssue from "@/views/aricleIssue";
import aricleIssue1 from "@/views/aricleIssue1";
import Doctor from "@/views/Doctor";
import EditProgram from "@/views/editProgram";


const routes=[
    {
        path:'/',
        name:"Login",
        component:Login,
    },
    {
        path: "/backView",
        name: "backView",
        component: backView,
        redirect:'/backView/shouYe',
        children: [
            {
                path:'/aricleIssue1',
                name:"aricleIssue1",
                component:aricleIssue1,
            },
            {
                path: 'shouYe',
                name: 'shouYe',
                // meta: {
                //     name: '首页 /'
                // },
                component: ShouYe,
            },
            {
                path: 'sys/user',
                name: 'user',
                meta: {
                    name: '  /  系统管理  /  用户管理'
                },
                component: yongHuGuanli,
            },
            {
                path: 'sys/role',
                name: 'role',
                meta: {
                    name: '  /  系统管理  /  角色管理'
                },
                component: role,
            },
            {
                path: 'sys/dept',
                name: 'dept',
                meta: {
                    name: '  /  系统管理  /  机构管理'
                },
                component: detp,
            },
            {
                path: 'sys/aricleList',
                name: 'aricleList',
                meta: {
                    name: '  /  文章管理  /  文章列表'
                },
                component: aricleList,
                children: [

                ]
            },
            {
                path: 'sys/aricleIssue',
                name: 'aricleIssue',
                meta: {
                    name: '  /  文章管理  /  文章发布'
                },
                component: aricleIssue,
            },
            {
                path: 'pic/control',
                name: 'PicControl',
                meta: {
                    name: '  /  轮播图  /  轮播图管理'
                },
                component: picShow,
            },
            {
                path: 'sys/doctor',
                name: 'doctor',
                meta:{
                    name: '  /  系统管理  /  医生管理'
                },
                component: Doctor
            },
            {
                path: 'sys/programedit',
                name:'programEdit',
                meta: {
                    name:'  /  开展项目  /  项目编辑'
                },
                component: EditProgram,
            },
        ]
    },

]

const router = createRouter({
        history: createWebHistory(),
        routes
    }
)
export {router}