import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.prototype.$EventBus = new Vue()
