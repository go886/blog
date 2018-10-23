import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Index from './components/Index'
import Category from './components/Category'
import Article from './components/Article'
import Tag from './components/Tag'
import Link from './components/Link'
import Setting from './components/Setting'
import UserSetting from './components/UserSetting'
// import Login from './components/Login'
// import About from '@/components/About'

const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: '概览',
            component: Index,
        },
        {
            name: "公告",
            path: "/notice",
            component: null,
        },
        {
            path: '/cate',
            name: '分类',
            component: Category,
        },
        {
            path: '/article/:page?',
            name: '文章',
            component: Article,
        },
        {
            path: '/tag',
            name: '标签',
            component: Tag,
        },
        {
            path: '/link',
            name: '链接',
            component: Link,
        },
        {
            name: "评论",
            path: "/comment",
            component: null,
        },
        {
            path: '/setting',
            name: '网站配置',
            component: Setting,
        },
        {
            path: '/usersetting',
            name: '用户设置',
            component: UserSetting,
        },
        // {
        //     path: '/login',
        //     name: '登录',
        //     component: Login,
        // },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.name) {
        document.title = to.name + " - 管理后台"
    }
    next()
})

export default router;
