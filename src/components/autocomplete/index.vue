<template lang="pug">
  div(class='autocomplete')

    input(class='autocomplete__field'
          :class=`{
            'autocomplete__field--error': error,
            'autocomplete__field--warning': shouldShowWarning
          }`
          v-model="search"
          ref="searchField"
          @blur="handleBlur"
          @input="handleInput"
          @keyup.enter="handleEnter"
          placeholder="Начните вводить код или название")

    ul(class='dropdown' v-show="shouldShowDropdown")
      li(class='dropdown__item dropdown__item--disabled' v-show="!search")
        span(class='dropdown__item__name')
          | Популярные города

      li(class='dropdown__item'
        v-for="(item, index) in shortCityList"
        @click="setItem(index)"
        @mouseover="currentIndex = index"
        :class="{ active: index === currentIndex }")
        span(class='dropdown__item__code'
            v-show="compositeList"
            v-if="highlight"
            v-html="highlightMatches(item.Id, search)")
        span(class='dropdown__item__code' v-show="compositeList" v-else) {{ item.Id }}

        span(class='dropdown__item__name'
            v-if="highlight"
            v-html="highlightMatches(item.City, search)")
        span(class='dropdown__item__name' v-else) {{ item.City }}

      li(class='dropdown__item' v-show="shouldShowNotFound")
        span(class='dropdown__item__name') Не найдено

      li(class='dropdown__item dropdown__item--disabled'
        v-show="search && shortCityList.length")
        span(class='dropdown__item__name')
          | Показано {{ shortCityList.length }} из {{ filteredCities.length }} найденных городов
</template>

<script lang="ts" src="./script"></script>

<style lang="sass">
  .autocomplete
    position: relative
    perspective: 500px
    height: 30px
    width: 100%

    &__field
      outline: 1px solid #ccc
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

        & + .dropdown
          transform: scale(1) translateY(0) rotateX(0)
          visibility: visible
          opacity: 1
          
      &--error
        outline: 2px solid red
        &:focus
          outline: 2px solid #4d90f4

      &--warning
        outline: 2px solid goldenrod
        &:focus
          outline: 2px solid goldenrod

    .dropdown
      // transform: scale(.5) translateY(-30px) rotateX(90deg)
      box-shadow: 0 3px 15px rgba(#000, .5)
      transition: .2s ease-out
      background-color: #fff
      // visibility: hidden
      position: absolute
      border-radius: 2px
      perspective: 300px
      overflow: hidden
      width: 100%
      // opacity: 0
      top: 34px

      &__item
        border-top: 1px solid #ddd
        line-height: 25px
        font-size: 14px
        cursor: pointer
        padding: 0 6px
        display: block
        height: 26px
        width: 100%

        &:hover,
        &.active
          background-color: #4d90f4
          color: #fff

        &--disabled
          font-size: 13px
          color: rgba(#000, .54)
          
        &--warning
          
        &__code
          display: inline-block
          padding-right: 5px
          text-align: center
          margin-right: -4px
          width: 40px
          
        &__name
          display: inline-block
          text-align: center

          &::first-letter
            text-transform: uppercase
</style>
