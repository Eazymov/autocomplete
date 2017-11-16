import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
class Autocomplete extends Vue {

  public search: string = '';
  public error: Error|null = null;
  public currentIndex: number = -1;
  public selectedItem: City|null = null;

  @Prop({ required: true })
  public cities: Array<City>;

  @Prop({ default: false })
  public highlight: boolean;

  @Prop({ default: false })
  public canCreateValue: boolean;

  @Prop({ default: false })
  public canCreateCart: boolean;

  @Prop({ default: false })
  public compositeList: boolean;

  @Prop({ default: false })
  public canSetAnyValue: boolean;

  @Prop({ default: false })
  public showFavs: boolean;
  
  private get searchField (): HTMLInputElement {
    return <HTMLInputElement>this.$refs.searchField;
  }
  
  public get shouldShowDropdown (): boolean {
    const searchIsFilled: boolean = Boolean(this.search);

    return searchIsFilled || (!searchIsFilled && this.showFavs);
  }

  public get favorites (): Array<City> {
    return this.cities.filter((item: City) => item.favorite)
  }

  public get filteredCities (): Array<City> {
    const search: string = this.search.toLowerCase();
    const cities: Array<City> = this.cities;

    return cities.filter(({ City, Id }: City) => {
      const city: string = City.toLowerCase();
      const id: string = Id.toString();

      return city.includes(search) || id.includes(search);
    })
  }
  
  public get shortCityList (): Array<City> {
    return this.search
      ? this.filteredCities.slice(0, 5)
      : this.favorites;
  }

  public get shouldShowNotFound (): boolean {
    const cityNotFound: boolean = this.shortCityList.length === 0;
    const canSetAnyValue: boolean = this.canSetAnyValue;

    return cityNotFound && !canSetAnyValue;
  }
  
  public get shouldShowWarning (): boolean {
    return true;
  }

  public getCityByMatch (): City|undefined {
    const search: string = this.search.toLowerCase();
    
    return this.shortCityList.find((item: City) => {
      const id: string = item.Id.toString().toLowerCase();
      const name: string = item.City.toLowerCase();

      return id === search || name === search
    })
  }
  
  public highlightMatches (value: any, search: string): string {
    const match: string = search.toLowerCase();
    const text: string = value.toString().toLowerCase();

    if (!match) return text;

    return text.replace(match, `<strong>${match}</strong>`);
  }
  
  public setItem (index: number): void {
    const selectedItem: City = this.filteredCities[index];
    
    this.selectedItem = selectedItem;
    this.search = selectedItem.City;
    this.searchField.blur();
  }

  public handleBlur (event: Event): void {
    event.preventDefault();

    const city: City|undefined = this.getCityByMatch();
    const search: string = this.search;

    if (city) {
      this.selectedItem = city;
      this.error = null; 
    } else if (!search) {
      this.error = null;
    } else {
      this.selectedItem = null;
      this.error = new Error('Value is not selected')
    }

    this.searchField.blur();
  }

  public handleInput (): void {
    this.error = null;
    this.selectedItem = null;
  }

  public handleEnter (): void {
    if (this.canCreateValue) {
      this.$emit('create', this.search);
    }

    this.searchField.blur();
  }
}

export default Autocomplete
