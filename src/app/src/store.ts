import Vue from 'vue';
import Vuex from 'vuex';

import { RootStateModel } from './models/RootStateModel';
import { DataLoader } from './DataLoader';
import { FindChild } from './utils/ComponentHelper';

Vue.use(Vuex);

export default new Vuex.Store<RootStateModel>({
  state: new RootStateModel(),
  getters:
  {
    SelectedComponent: state => 
    {      
      if (state.Component && state.SelectedComponentId)
      {
       return FindChild(state.Component, state.SelectedComponentId)
      }
    }
  },
  mutations: {
    LoadComponent(state, rootComponent) {
      state.Component = rootComponent;
      state.SelectedComponentId = rootComponent.Id;
    },
    SelectComponent(state, selectedComponent) {
      state.SelectedComponentId = selectedComponent.Id;
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
    AddNewComponent(state, component)
    {     
      if (state.Component && state.SelectedComponentId)
      {
        var target = FindChild(state.Component, state.SelectedComponentId);
        if (target)
        {
          target.SubComponents.push(component);
        }
      }
    },
    AddNewLinkToComponent(state, payload)
    {
      if (state.Component)
      {
        let target = FindChild(state.Component, payload.id);
        if (target)
        {          
          target.Links.push(payload.link);
        }
      }
    }
  },
  actions: {
    LoadData(context) {
      var dummyData = new DataLoader().LoadDummyData();
      context.commit('LoadComponent', dummyData);
    }
  },
});
