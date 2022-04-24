<template>
  <div class="list-view">
    <button class="add-item-button"> Add </button>
    <DeleteCaution :active="deleteCautionActivate" :resolve="deleteCautionResolve" :reject="deleteCautionReject"/>
    <ItemModal :action="modalProperties.action" :active="modalProperties.active" :item="modalProperties.item"
               @cancel="onModalCancel" @confirm="onModalConfirm"/>
    <div class="list-container">
      <ItemCard v-for="item in listItems" :key="item.id" :listItem="item" class="list-item"
                @edit="onCardEdit(item.id)"
                @delete="onCardDelete(item.id)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import {onMounted, ref} from "vue";
import {CRUD, ListItem, ModalProps} from "@/types/common-types";
import ItemModal from "@/components/ItemModal.vue";
import {deleteItem, getData, updateItem} from "@/utils/localStorage-api";
import DeleteCaution from "@/components/DeleteCaution.vue";

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
  listItems.value = getData()
})

function onModalCancel() {
  setModalProperties()
}

function onModalConfirm(action: CRUD, modifiedData: ListItem) {
  if (action === CRUD.update) {
    updateItem(modifiedData)
  } else if (action === CRUD.create) {
    //todo
  }
  modalProperties.value.active = false
  listItems.value = getData()
}

function onCardEdit(id: number) {
  const item: ListItem | undefined = listItems.value?.find((item: ListItem) => item.id === id)
  if (item == undefined) {
    throw new Error('there is no such item')
  }
  setModalProperties(item.id, CRUD.update, item.title, item.description, item.tags, true)
}

function onCardDelete(itemId: number) {
  new Promise((resolve, reject) => {
    deleteCautionActivate.value = true
    deleteCautionResolve.value = resolve
    deleteCautionReject.value = reject
  }).then(() => {
    deleteItem(itemId)
    listItems.value = getData()
  }).catch(() => {
    // nothing
  }).finally(() => {
    deleteCautionActivate.value = false
  })
}

function setModalProperties(id: number | undefined = undefined, action: CRUD = CRUD.nothing,
                            title = '', description = '',
                            tags: string[] = [], active = false) {
  modalProperties.value.item.id = id
  modalProperties.value.item.title = title
  modalProperties.value.item.description = description
  modalProperties.value.item.tags = tags

  modalProperties.value.action = action
  modalProperties.value.active = active
}
</script>

<style scoped lang="sass">
$width-of-a-card: 251px
.list-view
  display: flex
  width: 100vw
  max-width: 100%
  padding-top: 10px
  justify-content: center

  .add-item-button
    color: #ffffff
    font-family: roboto, sans-serif
    font-size: 15px
    position: fixed
    top: 15px
    right: 20px
    z-index: 3

    box-sizing: border-box
    width: 50px
    height: 30px

    background-color: #477958
    border: none
    border-radius: 3px

  .list-container
    @media screen and (max-width: $width-of-a-card * 2)
      width: $width-of-a-card
    @media screen and (min-width: $width-of-a-card * 2)
      width: $width-of-a-card * 2
    @media screen and (min-width: $width-of-a-card * 3)
      width: $width-of-a-card * 3
    @media screen and (min-width: $width-of-a-card * 4)
      width: $width-of-a-card * 4
    @media screen and (min-width: $width-of-a-card * 5)
      width: $width-of-a-card * 5
    display: flex
    flex-wrap: wrap

    .list-item
      margin: 6px 3px 0 6px
</style>
