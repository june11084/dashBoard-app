import Vue from 'nativescript-vue';

import Counter from './components/Counter';

import Welcome from './components/Welcome';

import store from './store';



import './styles.scss';

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(Welcome),

  store,

}).$start();
