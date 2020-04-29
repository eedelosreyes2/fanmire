import Vue from 'vue'
import App from './App.vue'

import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  render: h => h(App),
});
