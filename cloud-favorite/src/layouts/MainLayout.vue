<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          航哥网址云收藏
        </q-toolbar-title>

        <div v-if="userName!=null">用户{{userName}}</div>
        <div v-if="userName!=null" @click="logout" class="menu">退出登录</div>
        <div v-if="userName===null" @click="gotoLogin" class="menu">登录</div>
        <div v-if="userName===null" @click="gotoRegister"  class="menu">注册</div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          菜单
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import { LocalStorage } from 'quasar'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  mounted () {
    this.$EventBus.$on('login', (msg) => {
      // A发送来的消息
      this.userName = LocalStorage.getItem('userName')
      this.essentialLinks = [
        {
          title: '添加收藏',
          icon: 'school',
          link: '/'
        },
        {
          title: '我的收藏',
          icon: 'code',
          link: '/#/urlList'
        }
      ]
    })
  },
  data () {
    return {
      leftDrawerOpen: false,
      userName: LocalStorage.getItem('userName'),
      essentialLinks: LocalStorage.getItem('userName') != null ? [
        {
          title: '添加收藏',
          icon: 'school',
          link: '/'
        },
        {
          title: '我的收藏',
          icon: 'code',
          link: '/#/urlList'
        }
      ] : []
    }
  },
  computed: {
  },
  methods: {
    gotoLogin: function () {
      this.$router.push('/login')
    },
    gotoRegister: function () {
      this.$router.push('/register')
    },
    logout: function () {
      LocalStorage.remove('userId')
      LocalStorage.remove('userName')
      LocalStorage.remove('token')

      this.userName = LocalStorage.getItem('userName')
      this.essentialLinks = []

      this.$router.push('/login')
    }
  }

}
</script>

<style lang="scss">
  .menu {
    margin-left: 10px;
  }

</style>
