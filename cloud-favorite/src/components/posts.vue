<template>
  <q-page class="flex column">
    <div id="searchLayout" class="flex row no-padding">
      <q-input filled v-model="searchKey"  class="no-padding" placeholder="输入关键字"/>
      <q-btn color="primary" label="搜索" id="btn_search" v-on:click="$emit('search', searchKey)"/>
    </div>
    <q-list>
      <q-item  clickable v-ripple v-for="url in urls"
              :key="url.uid" @click="itemClick(url.uid,url.url)" id="titleLayout">
        <div v-html="url.title" id="title">
        </div>
        <div id="createDate">
          创建日期：{{formatDate(url.createDate)}}
        </div>

        <div id="edit" @click="edit(url.uid)" v-if="showEdit(url.userId)">
          编辑
        </div>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { date, LocalStorage } from 'quasar'

export default {
  name: 'posts',
  data () {
    return {
      searchKey: ''
    }
  },
  props: {
    urls: {
      type: Array
    }
  },
  methods: {
    formatDate: function (dateMills) {
      return date.formatDate(dateMills, 'YYYY-MM-DD hh:mm:ss')
    },
    itemClick (uid, url) {
      this.$router.push({ path: '/postDetail', query: { postId: uid } })
    },
    edit (uid, url) {
      this.$router.push({ path: '/writePost', query: { postId: uid } })
    },
    showEdit (userId) {
      return userId === LocalStorage.getItem('userId')
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
    margin-top: 20px;
  }
  #btn_search {
    margin-left: 10px;
  }
  input{
   height: 40px;
    padding: 5px;
  }
  #edit {
    margin-left: 20px;
  }
</style>
