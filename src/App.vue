<template lang="pug">
  #root
    .example
      span.example__title Autocomplete
      autocomplete(:cities="cities")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Autocomplete from 'Components/autocomplete';
  import API from 'API';

  @Component({
    components: {
      Autocomplete,
    },
  })
  class App extends Vue {

    public cities: Array<City> = [];

    public created (): void {
      API.getCities()
        .then((cities: Array<City>) => {
          this.cities = cities;
        })
    }
  }

  export default App
</script>

<style lang="sass">
  *,
  *::before,
  *::after
    box-sizing: border-box
    outline: none
    padding: 0
    margin: 0

  html, body
    font-family: 'Segoe UI'
    line-height: 20px
    min-height: 100vh
    font-size: 14px
    color: #404040
    width: 100%

  #root
    justify-content: center
    align-items: center
    min-height: 100vh
    display: flex
    width: 100%

  .example
    box-shadow: 0 1px 2px rgba(#000, .5)
    padding: 14px 16px
    border-radius: 2px

    &__title
      font-weight: normal
      font-size: 26px
</style>
