import { createStore } from 'vuex';
import router from './router';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      notification: null,
      loading: false,
    }
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
    notification(state, message) {
      state.notification = message;
    },
    loading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: {
    alert({ commit }, message) {
      commit('notification', message);

      setTimeout(() => {
        commit('notification', null);
      }, 3000)
    },
    login({ commit }) {
      commit('login');
    },
    logout({ commit }) {
      commit('logout');
      router.push('/');
    },
  }
})

export default store
