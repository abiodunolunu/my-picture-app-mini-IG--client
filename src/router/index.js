/* eslint-disable no-unused-vars */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter, {
  mode: 'history'
})


const routes = [

  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      const authStatus = store.getters["Auth/isAuth"]
      if (authStatus === false) {
        next('/login') 
      } else {
        next()
      }
    },
    children: [
      {
        path: '/home/new',
        name: 'Compose',
        beforeEnter(to, from, next) {
          const authStatus = store.getters["Auth/isAuth"]
          if (authStatus === false) {
            next('/login') 
          } else {
            next()
          }
        },
        component: () => import(/* webpackChunkName: "newpost" */  '../components/NewPost.vue')
      }
    ]

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    name: 'postDetails',
    path: '/p/:postId',
    beforeEnter(to, from, next) {
      const authStatus = store.getters["Auth/isAuth"]
      if (authStatus === false) {
        next('/login') 
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "postDetails" */  '../views/postDetails.vue'),
    props: true
  },

  {
    name: 'All',
    path: '/all',

    component: () => import(/* webpackChunkName: "single" */  '../components/AllPosts.vue')
  },

  {
    path: '/login',
    name: 'Login',
    beforeEnter(to, from, next) {
      const authStatus = store.getters["Auth/isAuth"]
      if (authStatus === true) {
        next('/home') 
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    beforeEnter(to, from, next) {
      const authStatus = store.getters["Auth/isAuth"]
      if (authStatus === true) {
        next('/home') 
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/SignUp.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
