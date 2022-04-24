<template>
  <div class="app-header">
    <header><h1>Law&Good List</h1>
      <slot></slot>
    </header>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="sass">
.app-header
  box-sizing: border-box
  width: 100vw
  max-width: 100%
  height: 50px
  padding-top: 15px
  padding-left: 5px

  border-bottom: 1px solid gray

  header
    h1
      font-family: 'libre bodoni', 'sans-serif'
      font-size: 30px
      color: rgb(19, 86, 58)
      margin-left: 3px
</style>
