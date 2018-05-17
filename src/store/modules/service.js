import axios from 'axios';
import * as appSettings from 'application-settings';
import * as camera from "nativescript-camera";
const state = {
  apiToken: "Please Log in",
  profileObject: null,
  allResults: [{id:20, name: "blue" }, {id:10, name: "red"}, {id:32, name: "green"}, {id:5, name: "yellow"}],
};

const getters = {
  getToken: state => {
    return state.apiToken;
  },
  getProfileObject: state => {
    return state.profileObject;
  }
}

const mutations = {
  setToken(state, token){
    state.apiToken=token;
  },
  setProfile(state, profileObject){
    state.profileObject = profileObject;
  }
};

const actions = {
  setToken ({commit}, token) {
     commit('setToken', token);
  },
  callLoginApi ({commit}, loginInfo) {
    console.log("callLoginApi started")
    console.log(loginInfo.userName +" "+  loginInfo.password)
    return axios({
      method: 'post',
      url: `http://api.mytrailhead.net/v1/client/login`,
      headers: {
      },
      data: {
        email: loginInfo.userName,
        password: loginInfo.password
      },
    }).then((response) => {
      console.log("2. api responded")
      console.log(response)
      let token = response.data.remember_token;
      commit('setToken', token)
      console.log("callLoginApi finished ")
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
  },
  getProfileApi ({commit}) {
    console.log("getProfileApi started")
    return axios({
      method: "get",
      url: `http://api.mytrailhead.net/v1/dashboard/public/profile`,
      headers: {
        userauth: state.apiToken
      },
      data: {}
    }).then((response) => {
      console.log("2. api responded");
      console.log(response);
      let rawProfileObject = response.data.public_profile;
      let profileObject = {
        solo_agent: response.data.public_profile.solo_agent,
        agent_type: response.data.public_profile.agent_type,
        company_name: response.data.public_profile.company_name,
        phone: response.data.public_profile.phone,
        email: response.data.public_profile.email,
        url: response.data.public_profile.url,
        address_street_1: response.data.public_profile.address_street_1,
        address_street_2: response.data.public_profile.address_street_2,
        address_city: response.data.public_profile.address_city,
        address_state_id: response.data.public_profile.address_state_id,
        address_zip: response.data.public_profile.address_zip,
        start_date: response.data.public_profile.start_date,
        short_description: response.data.public_profile.short_description,
        long_description: response.data.public_profile.long_description,
      }
      commit('setProfile', profileObject)
      console.log("getProfileApi finished ");
      console.log(state.profileObject);
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
  },
  updateProfile({commit}){
    return axios({
      method: "patch",
      url: `http://api.mytrailhead.net/v1/dashboard/public/profile`,
      headers: {
        userauth: state.apiToken
      },
      data: state.profileObject
    }).then((response) => {
      console.log("2. api responded");
      console.log(response);
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
