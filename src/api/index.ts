// import instance from './instance';
import citiesJSON from './kladr.json';

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

    return Promise.resolve(citiesJSON);
  }
};

export default API;
