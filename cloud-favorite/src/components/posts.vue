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
import { date } from 'quasar'

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
    search () {

    },
    itemClick (uid, url) {

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
