<template lang="pug">
  - const base = 'autocomplete';

  div(class=`${base}`)
    input(class=`${base}__field` placeholder="Начните вводить код или название")
    Dropdown(:cities="filteredCities")
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import Dropdown from './dropdown';

  @Component({
    components: { Dropdown, },
  })
  class Autocomplete extends Vue {

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

    get filteredCities (): Array<City> {
      return this.cities.slice(0, 4);
    }
  }

  export default Autocomplete
</script>

<style lang="sass">
  .autocomplete
    height: 30px
    position: relative
    width: 100%

    &__field
      outline: 1px solid #999
      font-family: inherit
      line-height: 30px
      font-size: 14px
      padding: 0 6px
      display: block
      border: none
      height: 30px
      width: 100%
      
      &:focus
        outline: 2px solid #4d90f4
</style>
