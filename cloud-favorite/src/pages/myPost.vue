<template>
  <div>
    <q-layout view="lHh lpr lFf" >
      <posts :urls="urls"  v-on:search="search"></posts>
    </q-layout>
  </div>
</template>

<script>
import { LocalStorage, Notify } from 'quasar'
import posts from '../components/posts.vue'

export default {
  name: 'myPost',
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
      urls: []
    }
  },
  computed: {
  },
  methods: {
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
    },
    search: function (searchKey) {
      const data = {
        params: {
          userId: LocalStorage.getItem('userId'),
          token: LocalStorage.getItem('token'),
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
  .q-tabs {
  }

</style>
