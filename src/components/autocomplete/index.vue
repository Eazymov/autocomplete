<template lang="pug">
  div(class='autocomplete')

    input(class='autocomplete__field'
          v-model="search"
          ref="searchField"
          placeholder="Начните вводить код или название")

    ul(class='dropdown' v-show="showDropdown")
      li(class='dropdown__item'
         v-for="(item, index) in filteredCities"
         @click="setItem(index)"
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
