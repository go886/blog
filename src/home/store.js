import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        config: {
            setting: {},
            cates: {list:[]},
            link: {list:[]},
            tags:{list:[]},
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
    tagURL(tag){
        return `/tag/${tag}`
    },
    gmtDateFormatter(time, fmt) {
        return moment(time).format(fmt || "YYYY/MM/DD");
    }
}


Object.keys(methods).forEach((key) => {
    store[key] = methods[key];
});
export default store;
