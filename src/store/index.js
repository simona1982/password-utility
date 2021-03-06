import Vue from "vue";
import Vuex from "vuex";

import Login from "./modules/login";
import Password from "./modules/password";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Login,
    Password
  }
});

