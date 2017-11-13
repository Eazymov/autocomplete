<template lang="pug">
  - const base = 'dropdown';

  ul(class=`${base}`)
    li(class=`${base}__item` v-for="item in cities")
      span(class=`${base}__item__code`) {{ item.Id }}
      span(class=`${base}__item__name`) {{ item.City }}
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  class Dropdown extends Vue {

    @Prop({ required: true })
    public cities: Array<City>;
  }

  export default Dropdown
</script>

<style lang="sass">
  .dropdown
    height: 30px
    position: relative
    width: 100%

    &__item
      border-bottom: 1px solid #ddd
      line-height: 26px
      font-size: 14px
      padding: 0 6px
      display: block
      border: none
      height: 26px
      width: 100%
</style>
