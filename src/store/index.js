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
import DataForm from "nativescript-ui-dataform";
import CheckBox from "nativescript-checkbox";
import DropDown from "nativescript-drop-down";
import { Fontawesome } from 'nativescript-fontawesome';
import { LoadingIndicator } from 'nativescript-loading-indicator';
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView)
Vue.registerElement('RadDataForm', () => require('nativescript-ui-dataform').RadDataForm)
Vue.registerElement('CheckBox', () => require('nativescript-checkbox').CheckBox)
Vue.registerElement('DropDown', () => require('nativescript-drop-down').DropDown)
Vue.use(Vuex, VueAxios, axios, camera, RadSideDrawer, CardView, DataForm, CheckBox, LoadingIndicator);
Fontawesome.init();
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
