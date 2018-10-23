import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Index from './components/Index'
import Post from './components/Post'
import About from './components/About'
import List from './components/Contents'

const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: '首页',
            component: List,
        },
        {
            path: '/about',
            name: '关于',
            component: About,
        },
        {
            path: '/:cate/:id',
            name: '文章',
            component: Post
        },
        {
            path: '/:cate',
            name: '分类',
            component: List
        },

        // {
        //     path: '/:cate',
        //     name: '类别',
        //     component: Index
        // },

        // {
        //     path: "/cate/:id",
        //     name: "类别",
        //     component: Index
        // }
        // , {
        //     path: '*',
        //     redirect: '/'
        // }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to)
    next();

})

export default router;
