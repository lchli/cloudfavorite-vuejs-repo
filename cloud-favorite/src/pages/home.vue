<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-tabs
        v-model="tab"
        class="text-teal"
      >
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  name: 'PageIndex',
  data: function () {
    return { url: '', title: '', tab: 'mails' }
  },
  methods: {
    add: function () {
      if (LocalStorage.getItem('userName') == null) {
        this.$router.push('/login')
        return
      }
      if (this.url == null || this.url === '') {
        alert('url为空')
        return
      }
      this.sendAd()
    },
    sendAd: function () {
      const data = new FormData()
      data.append('title', this.title)
      data.append('url', this.url)
      data.append('userId', LocalStorage.getItem('userId'))
      data.append('token', LocalStorage.getItem('token'))
      this.$axios.post('/api/fav/add', data).then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          alert('添加失败')
          return
        }
        if (response.data.code === '-1') {
          alert(response.data.errmsg)
          return
        }
        alert('添加成功')
      })
        .catch(function (error) {
          // handle error
          console.log(error)
          alert('添加失败')
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
  #btn {
    margin-top: 10px;
  }
</style>
