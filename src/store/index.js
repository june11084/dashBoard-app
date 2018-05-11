import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
import counter from './modules/counter';
import service from './modules/service';
import camera from "nativescript-camera";
import RadSideDrawer from "nativescript-ui-sidedrawer";
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.use(Vuex, VueAxios, axios, camera, RadSideDrawer);
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    counter,
    service,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;
