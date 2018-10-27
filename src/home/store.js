import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
       
    },
    mutations: {
    },
    getters: {
    },
    postURL(post) {
        return `/${post.category_name}/${post._k}`
    }
})

const methods = {
    postURL(post) {
        return `/${post.category_name}/${post._k}`
    },  
}


Object.keys(methods).forEach((key) => {
    store[key] = methods[key];
});
export default store;
