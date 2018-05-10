import axios from 'axios';
const state = {
  apiToken: "asdf",
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
        console.log("callLoginApi finished ")
      }).catch(function (error) {
        if (error.response) {
           // The request was made and the server responded with a status code
           // that falls out of the range of 2xx
           console.log(error.response.data);
           console.log(error.response.status);
           console.log(error.response.headers);
         } else if (error.request) {
           // The request was made but no response was received
           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
           // http.ClientRequest in node.js
           console.log(error.request);
         } else {
           // Something happened in setting up the request that triggered an Error
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
