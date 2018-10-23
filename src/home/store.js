import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
       
    },
    mutations: {
    },
    getters: {
    }
})

const methods = {
    setNameSpace(n) {
        this.state.namespace = n;
        VueCookies.set("oceanNameSpace", n, 100); //one day
    },
    nameSpaceTitle() {
        return ['社区','微淘', '头条'][this.state.namespace]
    }
   
}


Object.keys(methods).forEach((key) => {
    store[key] = methods[key];
});
export default store;
