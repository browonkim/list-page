<template>
  <div>
    <ItemModal/>
    <div class="list-container">
      <ItemCard v-for="item in listItems" :key="item.id" :listItem="item" class="list-item"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import axios from "axios";
import {onMounted, ref} from "vue";
import {ListItem} from "@/types/common-types";
import ItemModal from "@/components/ItemModal.vue";

const listItems = ref<Array<ListItem>>()

onMounted(() => {
  axios.get('http://localhost:8080/api/list')
      .then(response => {
        const retrievedListItems = response.data?.list ?? []
        listItems.value = [...retrievedListItems]
      })
})
</script>

<style scoped lang="sass">
.list-container
  display: grid
  width: 100vw
  max-width: 100%

  .list-item
    margin: 6px 3px 0 6px
</style>
