/* eslint-disable no-unused-vars */
import axios from "../../../axios";
import router from "../../router/index";
import store from "..";

const state = {
  signupErrors: null,
  signInErrors: null,
  token: null,
  userId: ''
};

const mutations = {
  setSignupErrors: (state, data) => {
    state.signupErrors = data;
  },
  setSignInErrors: (state, data) => {
    state.signInErrors = data;
  },
  authUser: (state, userData) => {
    state.token = userData.token
    state.userId = userData.userId
  },
  clearAuthData(state) {
    state.token = null
    state.userId = null
    state.userInfo = null
    store.commit('Feed/RESET', null, { root: true })
    store.posts = []
    store.singlePost = null
  },
};

const actions = {
  signup: async ({ commit }, authData) => {
    const body = {
      query: `mutation($firstname: String!, $lastname: String!, $email: String!, $password: String!, $confirmPassword: String!) {
                createUser(userInput: {firstname: $firstname, lastname: $lastname, email: $email, password: $password, confirmPassword: $confirmPassword}) {
                    _id
                    firstname
                    email
                }
            }`,
      variables: {
        email: authData.email,
        firstname: authData.firstname,
        lastname: authData.lastname,
        password: authData.password,
        confirmPassword: authData.confirmPassword,
      },
    };

    const result = await axios.post("/graphql", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.data.errors) {
      const error = result.data.errors[0].data;
      const errorArray = [];
      error.forEach((err) => {
        errorArray.push(err["message"]);
      });
      commit("setSignupErrors", errorArray);
      return;
    }

    router.push({
      name: "Login",
      params: { msg: `Account created ${result.data.data.createUser.email}` },
    });
  },
  signin: async ({ commit, dispatch }, authData) => {
    const body = {
      query: `
                query($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        token
                        user {
                          _id
                          firstname
                          lastname
                          email
                        }
                    }
                }`,
      variables: {
        email: authData.email,
        password: authData.password,
      },
    };
    const result = await axios.post("/graphql", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.data.errors) {
      const error = result.data.errors[0].data;
      const errorArray = [];
      error.forEach((err) => {
        errorArray.push(err["message"]);
      });
      commit("setSignInErrors", errorArray);
      return;
    }
    const { token, user } = result.data.data.login;
    commit("authUser", {
      token: token,
      userId: user._id,
    });
    const remainingTime = 60 * 60 * 1000;
    const expirationDate = new Date(new Date().getTime() + remainingTime);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("expirationDate", expirationDate);
    dispatch("setLogoutTimer", 3600);
    router.push({
      path: '/'
    })
  },
  setLogoutTimer: ({ commit, dispatch }, expirationDate) => {
    setTimeout(() => {
      dispatch("logout");
    }, expirationDate * 1000);
  },
  logout: ({ commit }) => {
    commit('clearAuthData')
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    router.push({
      name: 'Login'
    })
  },
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) {
      return router.push({
        path: '/login'
      })
    }
    const now = new Date();
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (now >= expirationDate) {
      return router.push({
        path: '/login'
      })
    }
    const userId = localStorage.getItem('userId')
    commit("authUser", {
      token: token,
      userId: userId,
    });
    if (store.getters["Auth/isAuth"]) {
      const requestedPath = window.location.pathname
      router.push(requestedPath)
    } else {
      router.push({
        path: '/login'
      })
    }
  }
};

const getters = {
  signupErrors: (state) => {
    return state.signupErrors;
  },
  signInErrors: (state) => {
    return state.signInErrors;
  },
  token: (state) => {
    return state.token
  },
  isAuth: (state) => {
    return state.token !== null
  },
  userId: (state) => {
    return state.userId
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
