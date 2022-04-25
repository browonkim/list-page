<template>
  <div>WARNING: RESET DATA</div>
</template>

<script setup lang="ts">
import {onBeforeMount} from "vue";
import {mockData} from "@/mockup/mock-data";
import {useRouter} from "vue-router";

const router = useRouter()
onBeforeMount(() => {
  if (window.confirm('주의: 확인을 누르면 현재 로컬스토리지의 데이터가 초기화됩니다.')) {
    localStorage.clear()
    window.localStorage.setItem('data', JSON.stringify(mockData))
  }
  router.replace('/')
})
</script>

<style scoped>

</style>
