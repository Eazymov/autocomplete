import Vue from 'vue'

Vue.config.productionTip = false

const mountComponent = (component: typeof Vue) => {
  return (new Vue(component)).$mount();
}

export {
  mountComponent,
}
