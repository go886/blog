import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Index from './components/Index'
import Category from './components/Category'
import Post from './components/Post'
import Tag from './components/Tag'
import Link from './components/Link'
import Setting from './components/Setting'
import UserSetting from './components/UserSetting'
// import About from '@/components/About'

const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: '概览',
            component: Index
        },
        {
            path: '/cate',
            name: '分类',
            component: Category,
        },
        {
            path: '/post',
            name: '文章',
            component: Post,
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
            path: '/setting',
            name: '全局设置',
            component: Setting,
        },
        {
            path: '/usersetting',
            name: '用户设置',
            component: UserSetting,
        },
        // {
        //     path: '/about',
        //     name: '关于',
        //     component: About,
        // },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (!Vue.config.env.islogin && to.path.indexOf('/login') !== 0) {
//         next('/login/' + encodeURIComponent(to.path))
//     } else {
//         next();
//     }
// })

export default router;
