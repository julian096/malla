import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.use(VueAxios,axios);

axios.defaults.baseURL = 'https://malla-docente.herokuapp.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
