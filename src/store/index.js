import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
import counter from './modules/counter';
import service from './modules/service';
import utill from './modules/utill';
import camera from "nativescript-camera";
import RadSideDrawer from "nativescript-ui-sidedrawer";
import CardView from "nativescript-cardview";
import DataForm from "nativescript-ui-dataform"
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView)
Vue.registerElement('RadDataForm', () => require('nativescript-ui-dataform').RadDataForm)
Vue.use(Vuex, VueAxios, axios, camera, RadSideDrawer, CardView, DataForm);
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    counter,
    service,
    utill,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;
