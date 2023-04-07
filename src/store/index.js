import Vue from 'vue';
import Vuex from 'vuex';
// import { state } from "./state";
// import * as getters from "./getters";
// import * as actions from "./actions";
// import * as mutations from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    donors: [],
  },
  mutations: {
    setDonors(state, donors) {
      state.donors = donors;
    },
  },
  actions: {
    setDonors({ commit }, donors) {
      commit('setDonors', donors);
    },
  },
  getters: {
    donors: (state) => state.donors,
  },
});

export default store;
