import Vue from 'vue'
import Autocomplete from './index.vue'

describe('Autocomplete field', function () {

  it('should mounts', function () {
    const component: any = new Vue(Autocomplete).$mount();

    expect(component._isMounted).toBeTruthy();
  })
})
