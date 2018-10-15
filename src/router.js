import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Index from '@/components/Index'
import About from '@/components/About'

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: '首页',
            component: Index
        }, {
            path: '/about',
            name: '关于',
            component: About,
        }
        , {
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
