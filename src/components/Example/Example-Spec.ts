import { mountComponent } from 'TestHelpers'
import Example from './index.vue'

describe('Example component', function () {

  it('should mounts', function () {
    const component: any = mountComponent(Example);

    expect(component._isMounted).toBeTruthy();
  })
})
