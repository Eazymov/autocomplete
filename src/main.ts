import 'normalize.css'

import Vue from 'vue'
import App from 'Components/App'

Vue.config.productionTip = false

new Vue({
  el: '#root',
  render: (h) => h(App),
  components: { App },
})
