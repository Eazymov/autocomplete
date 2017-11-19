import Vue from 'vue'
import App from './index.vue'

describe('App component', function () {

  it('should mounts', function () {
    const component: any = new Vue(App).$mount();

    expect(component._isMounted).toBeTruthy();
  })
})
