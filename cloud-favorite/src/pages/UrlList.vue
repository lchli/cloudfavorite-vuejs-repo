<template>
  <q-page class="flex column q-pa-md">
    <q-item v-ripple id="searchLayout">
    <q-input square filled v-model="searchKey" placeholder="输入关键字"></q-input>
      <q-btn color="primary" label="搜索" id="btn_search" @click="search()"/>
    </q-item>
    <q-list dense padding>
      <q-item clickable v-ripple v-for="url in urls"
              :key="url.uid" @click="itemClick(url.uid,url.url)" id="titleLayout">
        <div v-html="url.title" id="title">
        </div>
        <div id="createDate">
          创建日期：{{formatDate(url.createDate)}}
        </div>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

import { LocalStorage, date, Dialog } from 'quasar'

export default {
  name: 'UrlList',
  data () {
    return { urls: [], searchKey: '' }
  },
  mounted () {
    this.getList()
  },
  methods: {
    formatDate: function (dateMills) {
      return date.formatDate(dateMills, 'YYYY-MM-DD hh:mm:ss')
    },
    delete: function (urlId) {
      const data = { params: { userId: LocalStorage.getItem('userId'), token: LocalStorage.getItem('token'), favId: urlId } }
      this.$axios.get('/api/fav/delete', data).then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          alert('删除失败')
          return
        }
        if (response.data.code === '-1') {
          alert(response.data.errmsg)
          return
        }
        this.getList()
      }.bind(this))
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .finally(function () {
          // always executed
          console.log('always executed')
        })
    },
    copy: function (url) {
      this.$copyText(url).then(function (e) {
        alert('复制成功')
      }, function (e) {
        alert('复制失败')
      })
    },
    getList: function () {
      const data = { params: { userId: LocalStorage.getItem('userId'), token: LocalStorage.getItem('token') } }
      this.$axios.get('/api/fav/queryFavs', data).then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          alert('加载失败')
          return
        }
        if (response.data.code === '-1') {
          alert(response.data.errmsg)
          return
        }
        console.log(response.data.items)
        this.urls = response.data.items
      }.bind(this))
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .finally(function () {
          // always executed
          console.log('always executed')
        })
    },
    search: function () {
      const data = {
        params: {
          userId: LocalStorage.getItem('userId'),
          token: LocalStorage.getItem('token'),
          keyword: this.searchKey,
          page: 0,
          size: 100,
          sort: ''
        }
      }
      this.$axios.get('/api/search/list', data).then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          alert('加载失败')
          return
        }
        if (response.data.code === '-1') {
          alert(response.data.errmsg)
          return
        }
        console.log(response.data.items)
        this.urls = response.data.items
      }.bind(this))
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .finally(function () {
          // always executed
          console.log('always executed')
        })
    },
    itemClick: function (urlId, url) {
      Dialog.create({
        title: '提示',
        message: '选择操作:',
        options: {
          type: 'radio',
          model: 'opt1',
          // inline: true
          items: [
            { label: '复制', value: 'opt1', color: 'secondary' },
            { label: '删除', value: 'opt2' }
          ]
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        console.log('>>>> OK, received', data)
        if (data === 'opt1') {
          this.copy(url)
        } else if (data === 'opt2') {
          this.delete(urlId)
        }
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style lang="scss">
  #createDate {
   font-size: 10px;
    margin-left: 10px;
  }
  #titleLayout {
    align-content: center;
    align-items: center;
  }
  .eslight {
    color: #C10015;
  }
  #searchLayout {
    align-content: center;
    align-items: center;
    align-self: center;
  }
  #btn_search {
    margin-left: 10px;
  }
</style>
