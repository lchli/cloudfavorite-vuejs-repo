<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" >

      <q-footer bordered class="bg-white text-primary">
        <q-tabs no-caps active-color="white" indicator-color="transparent" class="bg-primary text-grey-5 shadow-2" v-model="tab">
          <q-tab name="posts" label="帖子" />
          <q-tab name="tools" label="工具" />
          <q-tab name="my" label="我的" />
        </q-tabs>
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-md">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="posts" class="q-pa-none">
              <posts :urls="urls"></posts>
            </q-tab-panel>

            <q-tab-panel name="tools">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="my">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" />
      </q-page-sticky>
    </q-layout>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import posts from '../components/posts.vue'

export default {
  name: 'MainLayout',
  components: {
    posts
  },
  mounted () {
    this.$EventBus.$on('login', (msg) => {
      // A发送来的消息
      this.userName = LocalStorage.getItem('userName')
      this.urls = [
        {
          title: '添加收藏',
          uid: 'school',
          link: '/'
        },
        {
          title: '我的收藏',
          uid: 'code',
          link: '/#/urlList'
        }
      ]
    })
  },
  data () {
    return {
      leftDrawerOpen: false,
      userName: LocalStorage.getItem('userName'),
      urls: [
        {
          title: '添加收藏',
          uid: 'school',
          link: '/'
        },
        {
          title: '我的收藏',
          uid: 'code',
          link: '/#/urlList'
        }
      ],
      tab: 'posts',
      innerTab: 'innerMails',
      splitterModel: 20
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
  .q-tabs {
  }

</style>
