import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import EventBus from 'vue-bus-ts';

Vue.config.productionTip = false;

Vue.use(EventBus);
var bus = new EventBus.Bus();

new Vue({
  router,
  store,
  bus,
  render: (h) => h(App),
}).$mount('#app');
