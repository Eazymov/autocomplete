// import instance from './instance';
import cities from './kladr';

const API = {
  getCities (): Promise<Array<City>> {
    /*
    return instance
      .get('/cities')
      .then(({ data }) => {
        const cities: Array<City> = data.cities;

        return cities;
      })
    */

    return Promise.resolve(cities);
  }
};

export default API;
