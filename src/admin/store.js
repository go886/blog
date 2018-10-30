import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        config: {
        }
    },
    mutations: {
    },
    getters: {

    },

})

const methods = {
    postURL(post) {
        return `/p/${post._k}`
    },
    cateURL(post){
        return `/c/${post.category_name}`
    },
    gmtDateFormatter(time, fmt) {
        return moment(time).format(fmt || "YYYY/MM/DD");
    },
    openCate(category_name) {
        window.open("/c/" + category_name);
    },
    openPost(post){
        window.open(this.postURL(post))
    }
}


Object.keys(methods).forEach((key) => {
    store[key] = methods[key];
});
export default store;
