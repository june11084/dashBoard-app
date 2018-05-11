import axios from 'axios';
import * as appSettings from 'application-settings';
import * as camera from "nativescript-camera";
const state = {
  apiToken: "Not Obtained",
  allResults: [{id:20, name: "blue" }, {id:10, name: "red"}, {id:32, name: "green"}, {id:5, name: "yellow"}],
};

const getters = {
  getToken: state => {
    return state.apiToken;
  }
}

const mutations = {
  setToken(state, token){
    state.apiToken=token;
  }
};

const actions = {
  callLoginApi ({commit}, email, password) {
      console.log("api called")
      return axios({
        method: 'post',
        url: `http://api.mytrailhead.net/v1/client/login`,
        headers: {},
        data: {
          email: 'djones@hotmail.com',
          password: 'Dj0nes@th'
        },
      }).then((response) => {
        console.log("2. api responded")
        console.log(response)
        console.log("header: " + Object.values(response.request._options))
        console.log("header: " + Object.values(response.request._options.headers))
        let token = response.data.remember_token;
        commit('setToken', token)
        console.log("callLoginApi finish ")
        //appSettings.setString("documentId", documentId);
      }).catch(function (error) {
        if (error.response) {
           console.log(error.response.data);
           console.log(error.response.status);
           console.log(error.response.headers);
         } else if (error.request) {
           console.log(error.request);
         } else {
           console.log('Error', error.message);
         }
         console.log(error.config);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
