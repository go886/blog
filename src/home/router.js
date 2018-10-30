import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Post from './components/Post'
import About from './components/About'
import Archives from './components/Archives'
import List from './components/Contents'
import NotFound from './components/NotFound'

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: '首页',
            component: List,
        },
        {
            path: '/c/:cate',
            name: '分类',
            component: List
        },
        {
            path: '/tag/:tag',
            name: '标签',
            component: List
        },
        {
            path: '/about',
            name: '关于',
            component: About,
        },
        {
            path: '/archives',
            name: '归档',
            component: Archives,
        },
        {
            path: '/p/:id',
            name: '文章',
            component: Post
        },
        {
            path: '*',
            name: '404',
            component: NotFound
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to)
    next();

})

export default router;
