<template>
  <div class="list-view-container">
    <button class="add-item-button" @click="onClickAddButton"> Add</button>
    <DeleteConfirm :active="deleteConfirmActive" :resolve="deleteConfirmResolve" :reject="deleteConfirmReject"
                   :title="deleteConfirmTitle"/>
    <ItemModal :action="modalProperties.action" :active="modalProperties.active" :item="modalProperties.item"
               @cancel="onModalCancel" @confirm="onModalConfirm"/>
    <div class="list-container">
      <ItemCard v-for="item in listItems" :key="item.id" :listItem="item" class="list-item"
                @edit="onCardEdit(item.id)"
                @delete="onCardDelete(item.id)" @click="onCardClick(item)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import {onMounted, ref} from "vue";
import {CRUD, ListItem, ModalProps} from "@/types/common-types";
import ItemModal from "@/components/ItemModal.vue";
import {createItem, deleteItem, getData, updateItem} from "@/utils/localStorage-api";
import DeleteConfirm from "@/components/DeleteConfirm.vue";
import moment from "moment";
import {useRouter} from "vue-router";

const listItems = ref<Array<ListItem>>()
const modalProperties = ref<ModalProps>({
  item: {},
  action: CRUD.nothing,
  active: false
})
const deleteConfirmActive = ref(false)
const deleteConfirmTitle = ref('')
// eslint-disable-next-line @typescript-eslint/no-empty-function
const deleteConfirmResolve = ref<(value: unknown) => void>(() => {})
// eslint-disable-next-line @typescript-eslint/no-empty-function
const deleteConfirmReject = ref<() => void>(() => {})

onMounted(() => {
  updateList()
})

function updateList() {
  listItems.value = getData().sort((a: ListItem, b: ListItem) => {
        if (a.createdAt === b.createdAt) {
          return (a.id ?? 0) > (b.id ?? 0) ? -1 : 1
        }
        return moment(a.createdAt).isAfter(b.createdAt) ? -1 : 1
      }
  )
}

function onClickAddButton() {
  activateModal(undefined, CRUD.create, '', '', [])
}

function onModalCancel() {
  deactivateModal()
}

function onModalConfirm(action: CRUD, data: ListItem) {
  if (action === CRUD.update) {
    updateItem(data)
  } else if (action === CRUD.create) {
    createItem(data)
  }
  modalProperties.value.active = false
  updateList()
}

function onCardEdit(id: string) {
  const item: ListItem | undefined = listItems.value?.find((item: ListItem) => item.id === id)
  if (item == undefined) {
    throw new Error('there is no such item')
  }
  activateModal(item.id, CRUD.update, item.title, item.description, item.tags)
}

function onCardDelete(itemId: string) {
  new Promise((resolve, reject) => {
    deleteConfirmActive.value = true
    deleteConfirmTitle.value = listItems.value?.find(item => item.id === itemId)?.title ?? ''
    deleteConfirmResolve.value = resolve
    deleteConfirmReject.value = reject
  }).then(() => {
    deleteItem(itemId)
    updateList()
  }).catch(() => {
    // canceled
  }).finally(() => {
    deleteConfirmActive.value = false
  })
}

const router = useRouter()

function onCardClick(item: ListItem) {
  router.push({
    path: `/detail/${item.id}`,
  })
}

function activateModal(id: string | undefined = undefined, action: CRUD = CRUD.nothing, title = '',
                       description = '', tags: string[] = []) {
  setModalProperties(id, action, title, description, tags, true)
}

function deactivateModal() {
  setModalProperties(undefined, CRUD.nothing, '', '', [], false)
}

function setModalProperties(id: string | undefined = undefined, action: CRUD = CRUD.nothing,
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
.list-view-container
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
    @media screen and (max-width: 515px)
      width: $width-of-a-card
    @media screen and (min-width: 515px)
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
      background-color: #ffffff
</style>
