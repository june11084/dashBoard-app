import axios from 'axios';
import * as appSettings from 'application-settings';
import * as camera from "nativescript-camera";
const state = {
};

const getters = {
}

const mutations = {
  setToken(state, token){
    state.apiToken=token;
  },
};

const actions = {
 navigateTo:({commit}) => commit('navigateTo')
};

export default {
  state,
  mutations,
  actions,
  getters
};
