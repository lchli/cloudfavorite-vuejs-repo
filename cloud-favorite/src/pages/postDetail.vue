<template>
  <div>
    <q-layout view="lHh lpr lFf" >
      <div id="title-post">{{post.title}}</div>
      <div id="username">作者：{{post.userName}}</div>
      <div id="content" v-html="post.url"></div>
    </q-layout>
  </div>
</template>

<script>
import { Notify } from 'quasar'

export default {
  name: 'postDetail',
  mounted () {
    // this.$EventBus.$on('login', (msg) => {
    //   // A发送来的消息
    //   this.userName = LocalStorage.getItem('userName')
    // })
    this.getPostDetail()
  },
  data () {
    return {
      post: {}
    }
  },
  computed: {
  },
  methods: {
    getPostDetail: function () {
      const data = { params: { postId: this.$route.query.postId } }
      this.$axios.get('/api/fav/queryPostDetail', data).then(function (response) {
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
        console.log(response.data)
        this.post = response.data
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
  #title-post {
    font-weight: bold;
    font-size: larger;
    margin-left: 5px;
    margin-top: 5px;
  }

  #username {
    font-style: italic;
    margin-left: 5px;
    margin-top: 5px;
  }

  #content {
    margin-top: 20px;
    margin-left: 5px;
  }

</style>
