import Vue from 'vue'
import App from './component/App.vue'

import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css"

Vue.use(wysiwyg);

new Vue(App).$mount('#app');