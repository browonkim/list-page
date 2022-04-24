<template>
  <div>
    <ItemModal/>
    <div class="list-container">
      <ItemCard v-for="item in listItems" :key="item.id" :listItem="item" class="list-item"
                @edit="onCardEdit(item.id)"
                @delete="onCardDelete(item.id)"/>
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
const modalProperties = ref<ModalProps>({
  item: {},
  action: CRUD.nothing,
  active: false
})
const deleteCautionActivate = ref(false)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const deleteCautionResolve = ref<(value: unknown) => void>(() => {
})
// eslint-disable-next-line @typescript-eslint/no-empty-function
const deleteCautionReject = ref<() => void>(() => {
})

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
