import Vue from 'vue';
import Vuex from 'vuex';

import { RootStateModel } from './models/RootStateModel';
import { DataLoader } from './DataLoader';
import { FindChild } from './utils/ComponentHelper';

Vue.use(Vuex);

export default new Vuex.Store<RootStateModel>({
  state: new RootStateModel(),
  mutations: {
    LoadComponent(state, rootComponent) {
      state.Component = rootComponent;
      state.SelectedComponent = state.Component;
    },
    SelectComponent(state, selectedComponent) {
      state.SelectedComponent = selectedComponent;
    },
    ComponentPositionChanged(state, payload)
    {
      if (state.Component)
      {
        let target = FindChild(state.Component, payload.id);
        if (target)
        {          
          target.Position = payload.position;
        }
      }
    },
  },
  actions: {
    LoadData(context) {
      var dummyData = new DataLoader().LoadDummyData();
      context.commit('LoadComponent', dummyData);
    }
  },
});
