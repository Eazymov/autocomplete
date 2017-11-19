<template lang="pug">
  .example
    span.example__title Autocomplete
    span.example__subtitle В поле осуществляется поиск по вхождению
    ul.example__opts-list
      li.example__opts-list__item(v-for="(option, key, index) in options" key="index")
        label.label(:for="`option--${key}`" :class="{ active: option.value }")
          | {{ option.title }}
          input(type="checkbox"
                :id="`option--${key}`"
                v-model="option.value"
                hidden)
    Autocomplete(:cities="cities"
                 :highlight="options.highlight.value"
                 :canCreateValue="options.canCreateValue.value"
                 :canCreateCart="options.canCreateCart.value"
                 :compositeList="options.compositeList.value"
                 :canSetAnyValue="options.canSetAnyValue.value"
                 :showFavs="options.showFavs.value"
                 @create="addCity")
</template>

<script lang="ts" src="./script"></script>

<style lang="sass" src="./style.sass"></style>
