import Vue from 'vue'
import Vuex from 'vuex'
import VueClipboard from 'vue-clipboard2'

// import example from './module-example'
import user from './user'
import main from './main'

Vue.use(Vuex)
Vue.use(VueClipboard)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user, main
    },

    state: {
      userId: '',
      userName: '',
      token: ''
    },
    mutations: {

    },
    actions: {

    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
