import API from './index'

describe('API', function () {

  it('should get cities', function (done) {
    API.getCities().then((cities: Array<City>) => {
      expect(Array.isArray(cities)).toBeTruthy();
      
      done();
    })
  })
})
