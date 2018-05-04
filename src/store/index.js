import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import counter from './modules/counter';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Vuex, VueAxios, axios);
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    counter,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;
