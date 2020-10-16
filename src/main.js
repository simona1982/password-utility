import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import moment from 'moment'

Vue.prototype.moment = moment

Vue.prototype.$http = axios


Vue.config.productionTip = false

// Global Guards
router.beforeEach((to, from, next) => {
  //console.log("ruta ", to);

  if (to.meta.requiresAuth) {
    const authToken = JSON.parse(window.localStorage.getItem('authToken'));

    if (authToken && authToken.accessToken) {
      next();
    } else {
      next({ name: 'login' });
    }
  }

  next();
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
