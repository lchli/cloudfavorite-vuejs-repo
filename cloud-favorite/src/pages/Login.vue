<template>
  <q-page class="flex flex-center column">
    <q-input square filled v-model="name" placeholder="输入账号"></q-input>
    <q-input square filled v-model="pwd" placeholder="输入密码" id="pwdbt"></q-input>
    <q-btn color="primary" label="登录" id="btn" @click="register()"/>
  </q-page>
</template>
<script>
import { LocalStorage } from 'quasar'

export default {
  data () {
    return {
      name: '',
      pwd: ''
    }
  },
  methods: {
    register: function () {
      const data = { params: { pwd: this.pwd, account: this.name } }

      const bus = this.$EventBus
      const rt = this.$router
      this.$axios.get('/api/user/login', data).then(function (response) {
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

        bus.$emit('login', '1')
        rt.push('/')
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
  }
}
</script>

<style lang="scss">
  #pwdbt {
    margin-top: 10px;
  }

  #btn {
    margin-top: 10px;
  }

</style>
