import Vue from 'vue'
// import Vuex from 'vuex'
import  App from './App.vue'
import store from '../store/index'

// Vue.use(Vuex)

let vm = new Vue({
    el: '#app',
    store,
    template: '<App></App>',
    components: {App}
})