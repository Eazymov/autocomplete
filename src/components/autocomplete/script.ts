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
  public valueCreation: boolean;

  @Prop({ default: false })
  public cartCreation: boolean;

  @Prop({ default: false })
  public compositeList: boolean;

  @Prop({ default: false })
  public showFavs: boolean;
  
  private get searchField (): HTMLInputElement {
    return <HTMLInputElement>this.$refs.searchField;
  }
  
  public get showDropdown (): boolean {
    return Boolean(this.search);
  }

  public get filteredCities (): Array<City> {
    const search: string = this.search.toLowerCase();
    const cities: Array<City> = this.cities;

    return cities.filter(({ City, Id }: City) => {
      const city: string = City.toLowerCase();
      const id: string = Id.toString();

      return city.includes(search) || id.includes(search);
    }).slice(0, 5);
  }
  
  public highlightMatches (value: any, search: string): string {
    const text: string = value.toString().toLowerCase();

    return text.replace(search, `<strong>${search}</strong>`);
  }
  
  public setItem (index: number): void {
    const selectedItem: City = this.filteredCities[index];
    
    this.selectedItem = selectedItem;
    this.search = selectedItem.City;
    
    this.searchField.blur();
  }
}

export default Autocomplete
