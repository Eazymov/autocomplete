<template lang="pug">
  #root
    Example
</template>

<script lang="ts" src="./script"></script>

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
    background-color: #eee
    align-items: center
    min-height: 100vh
    display: flex
    width: 100%
</style>
