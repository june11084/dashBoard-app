import axios from 'axios';
import VueAxios from 'vue-axios';

const state = {
  count: 0,
  themes: [],
  allResults: [{id:20, name: "blue" }, {id:10, name: "red"}, {id:32, name: "green"}, {id:5, name: "yellow"}],
};

const getters = {
  allResults: function(state) {
    let ret = {
      length: state.allResults.length,
      getItem: function(index){
        if(state.allResults[index]){
          return state.allResults[index].name
        }
        return "";
      },
      getObject: function(index){
        console.log("getObject ran")
        return state.allResults[index];
      }
    }
    return ret
  }
}

const mutations = {
  decrement (state) {
    state.count--;
  },
  increment (state) {
    state.count++;
  },
  populateResultArray (state, responseData){
    console.log("populateResult ran")
    for(let i = 0; i < responseData.data.domains.length ; i ++){
      console.log(responseData.data.domains[i]);
      console.log(state.count)
      state.count++;
    };
  }
};

const actions = {
  increment: ({commit}) => commit('increment'),
  decrement ({ commit }) {
    commit('decrement')
  },
  populateResultArray ({commit}, userName) {
    console.log("1. populateResult ran")
    console.log(userName)
    axios.get(`https://api.domainsdb.info/search?query=${userName}`).then((response) => {
      console.log("2. api responded")
      console.log("3. Api call done")
      console.log("4. api call finished")
      console.log(response)
      commit('populateResultArray', response)
      console.log("populateResult finished")
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
