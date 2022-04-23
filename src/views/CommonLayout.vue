<template>
  <div class="common-layout">
    <CommonHeader/>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from "@/views/CommonHeader.vue"

</script>

<style scoped lang="sass">
.common-layout
  width: 100vw
  max-width: 100%
  margin: 0
  padding: 0
</style>
