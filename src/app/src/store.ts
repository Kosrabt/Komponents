import Vue from 'vue';
import Vuex from 'vuex';
import { NetworkStore } from './network.vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules:{
    network: NetworkStore.ExtractVuexModule( NetworkStore ),
  }
});

export const vxm = {
  network: NetworkStore.CreateProxy( store, NetworkStore ),  
}