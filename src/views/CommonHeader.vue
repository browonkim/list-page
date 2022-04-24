<template>
  <div class="app-header">
    <header id="app-header"><h1>Law&Good List</h1>
      <slot></slot>
    </header>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.app-header
  position: sticky
  top: 0
  box-sizing: border-box
  width: 100vw
  max-width: 100%
  height: 60px
  padding-top: 20px
  padding-left: 5px

  border-bottom: 1px solid #989797ff
  box-shadow: 0 1px 5px 1px #dcdbdb
  background-color: #ffffff
  z-index: 1

  header
    h1
      font-family: 'libre bodoni', 'sans-serif'
      font-size: 30px
      color: rgb(19, 86, 58)
      margin-left: 3px
</style>
