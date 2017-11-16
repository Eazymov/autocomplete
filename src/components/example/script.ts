import { Vue, Component } from 'vue-property-decorator';
import Autocomplete from 'Components/autocomplete';
import API from 'API';

type Options = {
  [key: string]: {
    title: string;
    value: boolean;
  };
};

@Component({
  components: {
    Autocomplete,
  },
})
class Example extends Vue {

  public cities: Array<City> = [];
  public options: Options = {
    highlight: {
      title: 'Выделять вхождения',
      value: true,
    },
    canCreateValue: {
      title: 'Добавление своего значения (с помощью Enter)',
      value: false,
    },
    canCreateCart: {
      title: 'Добавление карточки',
      value: false,
    },
    compositeList: {
      title: 'Составной список',
      value: false,
    },
    canSetAnyValue: {
      title: 'Указание своего значения',
      value: true,
    },
    showFavs: {
      title: 'Избранные варианты',
      value: false,
    },
  };

  public async created (): Promise<void> {
    try {
      this.cities = await API.getCities()
    } catch (err) {
      console.error(err.message);
    }
  }
  
  public addCity (name: string): void {
    const newCityId: number = this.cities.length;
    const newCity: City = {
      City: name,
      Id: newCityId,
    };

    this.cities.push(newCity)
  }
}

export default Example
