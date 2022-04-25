<template>
  <div class="detail-view-container">
    <DeleteConfirm :active="deleteConfirmActive" :resolve="deleteConfirmResolve" :reject="deleteConfirmReject"
                   :title="item?.title"/>
    <ItemModal :action="CRUD.update" :active="itemModalActive" :item="item"
               @cancel="onModalCancel" @confirm="onModalConfirm"/>
    <div class="detail-container">
      <h2 class="item-title content-font">{{ item?.title }}</h2>
      <p class="item-created-at content-font">{{ item?.createdAt }}</p>
      <div class="item-tag-container">
        <mark v-for="tag in item?.tags" :key="tag" class="content-font">{{ tag }}</mark>
      </div>
      <p class="item-description">{{ item?.description }}</p>
      <div class="button-container">
        <button class="edit-button ui-font" @click="onEdit">Edit</button>
        <button class="delete-button ui-font" @click="onDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, ref} from "vue";
import {deleteItem, findItem, updateItem} from "@/utils/localStorage-api";
import {ListItem} from "@/types/common-types";
import DeleteConfirm from "@/components/DeleteConfirm.vue";
import ItemModal from "@/components/ItemModal.vue"
import {CRUD} from "@/types/common-types";

const route = useRoute()
const router = useRouter()

const item = ref<ListItem>()
const deleteConfirmActive = ref(false)
// eslint-disable-next-line @typescript-eslint/no-empty-function
const deleteConfirmResolve = ref<(value: unknown) => void>(() => {
})
// eslint-disable-next-line @typescript-eslint/no-empty-function
const deleteConfirmReject = ref<() => void>(() => {
})
const itemModalActive = ref(false)

onBeforeMount(() => {
  item.value = findItem(route.params.item as string)
  if (item.value === undefined) {
    alert('this item has been deleted')
    router.replace('/')
  }
})

function onEdit() {
  itemModalActive.value = true
}

function onModalConfirm(action: CRUD, data: ListItem) {
  updateItem(data)
  item.value = findItem(route.params.item as string)
  itemModalActive.value = false
}

function onModalCancel() {
  itemModalActive.value = false
}
function onDelete() {
  new Promise((resolve, reject) => {
    deleteConfirmActive.value = true
    deleteConfirmResolve.value = resolve
    deleteConfirmReject.value = reject
  }).then(() => {
    if (item.value?.id) {
      deleteItem(item.value.id)
    }
    deleteConfirmActive.value = false
    router.replace('/')
  }).catch(() => {
    // canceled
  }).finally(() => {
    deleteConfirmActive.value = false
  })
}
</script>

<style scoped lang="sass">
.detail-view-container
  width: 100vw
  max-width: 100%
  min-height: 85vh
  justify-content: center
  display: flex

  .detail-container
    margin: 20px 3vw
    @media screen and (max-width: 800px)
      width: 500px
    @media screen and (min-width: 801px)
      width: 800px
    background-color: white
    border-radius: 10px

    .item-title
      font-size: 40px
      margin: 10px 15px

    .item-tag-container
      margin: 10px 15px

      mark
        //noinspection SassScssResolvedByNameOnly
        background-color: $item-tag-color
        border-radius: 5px
        padding: 1px 5px

        &:not(:first-of-type)
          margin-left: 3px

    .item-created-at
      width: 50vh
      max-width: 80%
      margin: 10px 15px
      color: #575757

    .item-description
      margin: 10px 15px
      line-height: 1.3rem

    .button-container
      float: right
      margin-right: 15px
      margin-bottom: 10px

      button
        padding: 10px
        border: none
        border-radius: 5px

      .edit-button
        padding: 10px 15px
        margin-right: 7px
        background-color: #92e7ac

        &:hover
          background-color: #57d381

        &:active
          background-color: #7bb492

      .delete-button
        background-color: #ff7d7d

        &:hover
          background-color: #bd2626

</style>
