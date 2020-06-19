<template>
  <q-layout>
    <q-page-container>
  <q-page class="flex flex-center column">
    <q-input square filled v-model="name" placeholder="输入账号"></q-input>
    <q-input square filled v-model="pwd" placeholder="输入密码" id="pwdbt"></q-input>
    <q-btn color="primary" label="注册" id="btn" @click="register()"/>
  </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { LocalStorage, Notify } from 'quasar'
export default {
  data () {
    return {
      name: '',
      pwd: ''
    }
  },
  methods: {
    register: function () {
      const data = new FormData()
      data.append('pwd', this.pwd)
      data.append('account', this.name)
      // const bus = this.$EventBus
      const rt = this.$router
      this.$axios.post('/api/user/register', data).then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          Notify.create('服务器错误')
          return
        }
        if (response.data.code !== '1') {
          Notify.create(response.data.errmsg)
          return
        }

        LocalStorage.set('userId', response.data.uid)
        LocalStorage.set('userName', response.data.account)
        LocalStorage.set('token', response.data.token)

        // bus.$emit('login', '1')
        rt.replace('/index')
      })
        .catch(function (error) {
          // handle error
          console.log(error)
          Notify.create('加载失败')
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
