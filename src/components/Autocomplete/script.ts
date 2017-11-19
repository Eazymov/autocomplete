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
  
  public get cityNotFound (): boolean {
    return this.shortCityList.length === 0;
  }

  public get shouldShowAskForAdd (): boolean {
    return this.canCreateCart;
  }

  public get shouldShowNotFound (): boolean {
    return this.cityNotFound && !this.canSetAnyValue;
  }
  
  public get shouldShowWarning (): boolean {
    return this.cityNotFound && this.canSetAnyValue;
  }

  public getCityByMatch (): City|undefined {
    const search: string = this.search.toLowerCase();
    
    return this.filteredCities.find((item: City) => {
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
  
  public addItem (name: string): void {
    this.$emit('create', name);
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
    this.currentIndex = -1;
  }

  public handleEnter (): void {
    const curIndex: number = this.currentIndex;
    
    if (curIndex === this.shortCityList.length) {
      this.addItem(this.search);
    } else if (curIndex > -1) {
      this.setItem(curIndex);
    } else if (this.canCreateValue) {
      this.addItem(this.search);
    }

    this.searchField.blur();
  }

  public handleKeyDown (event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 38:
        this.decreaseCurrentIndex();
        break;

      case 40:
        this.increaseCurrentIndex();
        break;

      default:
        break;
    }
  }

  private decreaseCurrentIndex (): void {
    const index: number = this.currentIndex;
    const minIndex: number = 0;

    this.currentIndex -= index > minIndex ? 1 : 0;
  }

  private increaseCurrentIndex (): void {
    const index: number = this.currentIndex;
    let maxIndex: number = this.shortCityList.length - 1;
    if (this.canCreateCart) maxIndex += 1;

    this.currentIndex += index < maxIndex ? 1 : 0;
  }
}

export default Autocomplete
