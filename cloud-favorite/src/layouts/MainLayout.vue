<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" >

      <q-footer bordered class="bg-white text-primary">
        <q-tabs no-caps active-color="white" indicator-color="transparent" class="bg-primary text-grey-5 shadow-2" v-model="tab">
          <q-tab name="posts" label="帖子" />
          <q-tab name="my" label="我的" />
        </q-tabs>
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-md">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="posts" class="q-pa-none">
              <posts :urls="urls"></posts>
            </q-tab-panel>

            <q-tab-panel name="my">
              <div >用户：{{userName}}</div>
              <div >我的帖子</div>
              <div @click="logout()">退出登录</div>
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
    logout () {
      LocalStorage.remove('userId')
      LocalStorage.remove('userName')
      LocalStorage.remove('token')
      this.$router.replace('/')
    },
    gotoWritePost () {
      this.$router.replace('/writePost')
    },
    gotoRegister: function () {
      this.$router.push('/register')
    },
    getList: function () {
      const data = { params: { userId: LocalStorage.getItem('userId'), token: LocalStorage.getItem('token') } }
      this.$axios.get('/api/fav/queryFavs', data).then(function (response) {
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
    }
  }

}
</script>

<style lang="scss">
  .q-tabs {
  }

</style>
