import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./../views/Login.vue")
    },
    {
      path: "/dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "dashboard.candidate",
          component: () => import("../views/Candidate.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/dashboard/password-utility",
          name: "dashboard.password-utility",
          component: () => import("../views/PasswordUtility.vue"),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
