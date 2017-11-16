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

<style lang="sass">
  .example
    box-shadow: 0 1px 2px rgba(#000, .5)
    background-color: #fff
    margin-bottom: 35vh
    padding: 14px 16px
    border-radius: 2px
    width: 292px

    &__title
      font-weight: normal
      margin-bottom: 6px
      font-size: 22px
      display: block

    &__subtitle
      font-weight: normal
      margin-bottom: 6px
      font-size: 14px
      display: block

    &__opts-list
      margin-bottom: 6px
      list-style: none

      &__item
        display: block

        .label
          padding: 8px 0 8px 23px
          position: relative
          line-height: 14px
          user-select: none
          font-size: 14px
          cursor: pointer
          display: block
          width: 100%

          &::before,
          &::after
            position: absolute
            content: ''

          &::before
            border: 2px solid #ccc
            border-radius: 2px
            transition: .2s
            height: 14px
            width: 14px
            top: 7.5px
            left: 1px
            
          &::after
            transform: scale(0) rotateZ(0)
            border-bottom: 2px solid green
            border-right: 2px solid green
            transition: .2s
            height: 13px
            width: 8px
            left: 5px
            top: 7px

          &.active

            &::before
              opacity: 0

            &::after
              transform: scale(1) rotateZ(36deg)
</style>
