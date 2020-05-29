import Vue from 'vue'
import App from './App'
 
Vue.config.productionTip = false
//引入main.scss文件
import "./stylesheets/main.css"
//引入cookie

import request from "./common/request.js"
Vue.prototype.$http = request;
import wx_login from "./common/wx_login.js"
Vue.prototype.$login = wx_login;
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
