<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input v-model="title" placeholder="输入标题" filled ></q-input>
    <q-editor
      id="editor"
      ref="editor"
      v-model="qeditor"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    >
      <template v-slot:token>
        <q-btn-dropdown dense no-caps no-wrap unelevated color="white" :text-color="mycolorSelector" label="Text Color" size="sm">
              <q-color v-model="mycolor" @change="setcolor"   no-header
                       no-footer
                       default-view="palette"></q-color>
        </q-btn-dropdown>
      </template>
    </q-editor>
    <q-btn  size="middle" color="primary" @click="add" id="publish-btn">发布</q-btn>
  </div>
</template>
<script>
import { LocalStorage, Notify } from 'quasar'

export default {
  name: 'PageIndex',
  data: function () {
    return {
      title: '',
      qeditor: '',
      mycolor: 'primary',
      mycolorSelector: 'primary',
      post: null
    }
  },
  mounted () {
    if (this.$route.query.postId == null || this.$route.query.postId === '') {
      return
    }
    this.getPostDetail()
  },
  methods: {
    setcolor () {
      const edit = this.$refs.editor
      edit.caret.restore()
      edit.runCmd('foreColor', this.mycolor)
      this.mycolorSelector = this.mycolor
      edit.focus()
    },
    add: function () {
      console.log(this.qeditor)
      if (LocalStorage.getItem('userName') == null) {
        this.$router.push('/login')
        return
      }
      if (this.qeditor == null || this.qeditor === '') {
        Notify.create('内容为空')
        return
      }
      if (this.title == null || this.title === '') {
        Notify.create('title为空')
        return
      }
      this.sendAd()
    },
    sendAd: function () {
      const data = new FormData()
      if (this.post != null) {
        data.append('uid', this.post.uid)
      }
      data.append('title', this.title)
      data.append('url', this.qeditor)
      data.append('userId', LocalStorage.getItem('userId'))
      data.append('token', LocalStorage.getItem('token'))
      const R = this.$router
      this.$axios.post('/api/fav/add', data).then(function (response) {
        // handle success
        console.log(response.data)
        if (response.data == null) {
          Notify.create('服务器错误')
          return
        }
        if (response.data.code === '-1') {
          Notify.create(response.data.errmsg)
          return
        }
        Notify.create('添加成功')
        R.replace('/index')
      })
        .catch(function (error) {
          // handle error
          console.log(error)
          Notify.create('服务器错误')
        })
        .finally(function () {
          // always executed
          console.log('always executed')
        })
    },
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
        this.qeditor = this.post.url
        this.title = this.post.title
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
  #publish-btn {
    align-self: center;
    align-items: center;
    align-content: center;
    display: block;
  margin:50px auto;
  }
  #editor {
    margin-top: 20px;
  }
</style>
