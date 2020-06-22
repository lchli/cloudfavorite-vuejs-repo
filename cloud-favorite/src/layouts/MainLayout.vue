<template>
  <div>
    <q-layout view="lHh lpr lFf" >

      <q-footer bordered class="bg-white text-primary">
        <q-tabs no-caps active-color="white" v-model="tab" indicator-color="transparent" class="bg-primary text-grey-5 shadow-2">
          <q-tab name="posts" label="帖子" @click="changeTab('posts')"/>
          <q-tab name="my" label="我的" @click="changeTab('my')" />
        </q-tabs>
      </q-footer>

      <q-page-container>
        <q-page>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="posts" class="q-pa-none">
              <posts :urls="urls"  v-on:search="search"></posts>
            </q-tab-panel>

            <q-tab-panel name="my" class="flex column q-pa-none">
              <div id="q-item-username">用户：{{userName}}</div>
              <div class="q-item-my"  @click="myPost()">我的帖子</div >
              <div class="q-item-my"   @click="logout()">退出登录</div >
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="gotoWritePost()" />
      </q-page-sticky>
    </q-layout>
  </div>
</template>

<script>
import { LocalStorage, Notify } from 'quasar'
import posts from '../components/posts.vue'

export default {
  name: 'MainLayout',
  components: {
    posts
  },
  mounted () {
    // this.$EventBus.$on('login', (msg) => {
    //   // A发送来的消息
    //   this.userName = LocalStorage.getItem('userName')
    // })
    const uname = LocalStorage.getItem('userName')
    if (uname == null || uname === '') {
      this.$router.replace('/')
      return
    }
    let his = LocalStorage.getItem('tab')
    if (his == null || his === '') {
      his = 'posts'
    }
    this.tab = his
    this.getList()
  },
  data () {
    return {
      userName: LocalStorage.getItem('userName'),
      urls: [],
      tab: 'posts',
      innerTab: 'innerMails',
      splitterModel: 20
    }
  },
  computed: {
  },
  methods: {
    changeTab (tab) {
      LocalStorage.set('tab', tab)
    },
    myPost () {
      this.$router.push('/myPost')
    },
    logout () {
      LocalStorage.remove('userId')
      LocalStorage.remove('userName')
      LocalStorage.remove('token')
      LocalStorage.remove('tab')
      this.$router.replace('/')
    },
    gotoWritePost () {
      this.$router.push('/writePost')
    },
    gotoRegister: function () {
      this.$router.push('/register')
    },
    getList: function () {
      // const data = { params: { userId: LocalStorage.getItem('userId'), token: LocalStorage.getItem('token') } }
      this.$axios.get('/api/fav/queryAllFavs').then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          Notify.create('加载失败')
          return
        }
        if (response.data.code !== '1') {
          Notify.create(response.data.errmsg)
          return
        }
        console.log(response.data.items)
        this.urls = response.data.items
      }.bind(this))
        .catch(function (error) {
          // handle error
          console.log(error)
          Notify.create('加载失败')
        })
        .finally(function () {
          // always executed
          console.log('always executed')
        })
    },
    search: function (searchKey) {
      const data = {
        params: {
          keyword: searchKey,
          page: 0,
          size: 100,
          sort: ''
        }
      }
      this.$axios.get('/api/search/list', data).then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          Notify.create('加载失败')
          return
        }
        if (response.data.code === '-1') {
          Notify.create(response.data.errmsg)
          return
        }
        console.log(response.data.items)
        this.urls = response.data.items
      }.bind(this))
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
  .q-item-my {
    margin-top: 15px;
    margin-left: 10px;
  }

  #q-item-username {
    margin-left: 10px;
    margin-top: 5px;
  }
</style>
