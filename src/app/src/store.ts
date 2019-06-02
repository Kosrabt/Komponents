import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { NetworkStore } from './network.vuex';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'Komponent-network',
  modules: ['network']
})

export const store = new Vuex.Store({
  modules:{
    network: NetworkStore.ExtractVuexModule( NetworkStore ),
  },
  plugins: 
  [
    vuexLocal.plugin,
  ]
});

export const vxm = {
  network: NetworkStore.CreateProxy( store, NetworkStore ),
}