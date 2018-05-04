import axios from 'axios';
import VueAxios from 'vue-axios';

const state = {
  count: 10,
  allResults: ["1", "2", "3", "4"],
};

const getters = {
  allResults: state => state.allResults
}

const mutations = {
  decrement (state) {
    state.count--;
  },
  increment (state) {
    state.count++;
  },
  startLogin (state){
    let vm = this;
    let responseBack = "";
    login({
      title: "Login",
      message: "Please enter your user ID and Password",
      okButtonText: "Log In",
      cancelButtonText: "Cancel",
      userName: "Username",
      password: "Password"
    }).then(result => {
      console.log("Login Ran");
      console.log("apicall ran");
      responseBack = `${result.userName}`
    });
    return axios.get(`https://api.domainsdb.info/search?query=${responseBack}`).then((response) => {
      console.log("api responded")
      console.log("Api call done")
      //console.log(response)
      for(let i = 0; i < response.data.domains.length ; i ++){
        console.log(response.data.domains[i]);
        console.log(state.count)
        vm.state.count++;
        store.commit('decrement');
        // let resultArray = [state.allResults];
        //state.allResults.push(`${response.data.domains[i]}`);
        // console.log(resultArray)
      }
    });
    state.count++;
  }
};

const actions = {
  increment: ({commit}) => commit('increment'),
  decrement ({ commit }) {
    commit('decrement')
  },
  startLogin: ({commit}) => commit('startLogin')
};

export default {
  state,
  mutations,
  actions,
  getters
};
