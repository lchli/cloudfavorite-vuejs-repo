import Vue from 'vue'
import { LocalStorage } from 'quasar'

export function register (state, payload) {
  const data = new FormData()
  data.append('pwd', state.pwd)
  data.append('account', state.name)

  Vue.prototype.$axios.post('/api/user/register', data).then(function (response) {
    // handle success
    console.log(response.data)
    if (response.data == null) {
      return
    }
    if (response.data.code === '-1') {
      return
    }

    LocalStorage.set('userId', response.data.uid)
    LocalStorage.set('userName', response.data.account)
    LocalStorage.set('token', response.data.token)
    // let value = LocalStorage.getItem(key)

    // payload.context.rootState.userId = response.data.uid
    // payload.context.rootState.userName = response.data.account
    // payload.context.rootState.token = response.data.token

    // payload.router.push('/login')
  })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .finally(function () {
      // always executed
      console.log('always executed')
    })
}

export function updateName (state, name) {
  state.name = name
}

export function updatePwd (state, pwd) {
  state.pwd = pwd
}
