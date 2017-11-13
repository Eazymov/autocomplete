<template>
  
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  class Autocomplete extends Vue {

    @Prop({ default: [] })
    public cities: Array<City>;
  }

  export default Autocomplete
</script>

<style lang="sass">

</style>
