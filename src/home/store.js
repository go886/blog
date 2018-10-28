import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        config: {
            setting: {},
            cates: {list:[]},
            link: {list:[]}
        }
    },
    mutations: {
    },
    getters: {

    },

})

const methods = {
    postURL(post) {
        return `/${post.category_name}/${post._k}`
    },
    gmtDateFormatter(time, fmt) {
        return moment(time).format(fmt ? fmt : "YYYY/MM/DD");
    }
}


Object.keys(methods).forEach((key) => {
    store[key] = methods[key];
});
export default store;
