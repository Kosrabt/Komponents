import Vue from 'vue';
import Vuex from 'vuex';
import { NetworkStore } from './network.vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    network: NetworkStore.ExtractVuexModule( NetworkStore ),
  }
});
