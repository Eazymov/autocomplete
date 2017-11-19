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
          @keydown="handleKeyDown"
          placeholder="Начните вводить код или название")

    div(class="autocomplete__warning" v-show="shouldShowWarning")
      | Значения нет в справочнике.
      br
      | Возможно, вы ошиблись в написании

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

      li(class='dropdown__item'
         :class="{ active: currentIndex === shortCityList.length }"
         @click="addItem(search)"
         v-show="shouldShowAskForAdd"
         @mouseover="currentIndex = shortCityList.length")
        span(class='dropdown__item__name') + Добавить «{{ search }}»

      li(class='dropdown__item dropdown__item--disabled' v-show="shouldShowNotFound")
        span(class='dropdown__item__name') Не найдено

      li(class='dropdown__item dropdown__item--disabled'
         v-show="search && shortCityList.length")
        span(class='dropdown__item__name')
          | Показано {{ shortCityList.length }} из {{ filteredCities.length }} найденных городов
</template>

<script lang="ts" src="./script"></script>

<style lang="sass" src="./style.sass"></style>
