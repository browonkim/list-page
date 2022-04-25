<template>
  <teleport to="body">
    <div class="modal-container" v-show="props.active" @wheel.prevent>
      <div class="item-modal">
        <h2>{{ headerLabel }}</h2>
        <div class="input-title">
          <input placeholder="Title" class="input-title" v-model="localTitle" maxlength="40">
        </div>
        <textarea placeholder="Description" class="input-description" v-model="localDescription"
                  maxlength="1000"/>
        <div class="button-container">
          <button @click="onCancel">CANCEL</button>
          <button @click="onConfirm">{{ getOkButtonLabel() }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, ref, watchEffect} from "vue"
import {CRUD, ListItem} from "@/types/common-types"

interface ModalProps {
  item: ListItem
  action: CRUD,
  active: boolean
}

const props = defineProps<ModalProps>()
const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm', action: CRUD, listItem: ListItem): void
}>()

const localTitle = ref(props.item.title)
const localDescription = ref(props.item.description)

watchEffect(() => {
  if (props.active) {
    localTitle.value = props.item.title
    localDescription.value = props.item.description
  } else {
    localTitle.value = ''
    localDescription.value = ''
  }
})

const headerLabel = computed(() => {
  if (props.action === CRUD.create) {
    return 'Add Item'
  } else if (props.action === CRUD.update) {
    return 'Edit Item'
  }
  return ''
})

const modifiedItem = computed(() => {
  return {
    id: props.item.id,
    title: localTitle.value,
    description: localDescription.value,
    tags: props.item.tags,
    createdAt: props.item.createdAt
  } as ListItem
})

function getOkButtonLabel() {
  if (props.action === CRUD.create) {
    return 'ADD'
  } else if (props.action === CRUD.update) {
    return 'EDIT'
  }
}

function onCancel() {
  emits('cancel')
}

function onConfirm() {
  emits('confirm', props.action, modifiedItem.value)
}

// function onInput($event: InputEvent) {
//   const target = $event.target as HTMLInputElement
//   if (target.value.length >= 40) {
//     target.value = target.value.slice(0, 40)
//   }
//   localTitle.value = target.value
// }
</script>

<style scoped lang="sass">
$input-width: 340px
.item-modal
  box-sizing: content-box
  width: 350px
  height: 360px
  padding: 10px
  background-color: rgb(255, 255, 255)
  border: 1px solid black
  border-radius: 6px
  z-index: 2

  h2
    font-size: 24px
    margin-bottom: 10px

  .input-title
    display: block
    width: $input-width
    height: 25px
    margin-bottom: 10px

  .input-tags
    width: $input-width + 6px
    margin-bottom: 5px
    padding: 2px 0 2px 1px

  .input-description
    display: block
    box-sizing: border-box
    width: $input-width + 8px
    height: 200px
    padding: 5px
    resize: none

</style>
