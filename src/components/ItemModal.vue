<template>
  <teleport to="body">
    <div class="modal-container" v-show="props.active" @keydown="onKeyDown">
      <div class="item-modal">
        <h2 class="content-font">{{ headerLabel }}</h2>
        <input placeholder="Title" class="input-title content-font" v-model="localTitle" maxlength="40">
        <TagInput class="input-tags" :tags="localTags" @changeTags="onChangeTags"/>
        <textarea placeholder="Description" class="input-description content-font" v-model="localDescription"
                  maxlength="1000"/>
        <div class="button-container">
          <button @click="onCancel" class="cancel-button ui-font">Cancel</button>
          <button @click="onConfirm" class="confirm-button ui-font">{{ getConfirmButtonLabel() }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, ref, watchEffect} from "vue"
import {CRUD, ListItem} from "@/types/common-types"
import TagInput from "@/components/TagInput.vue";

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
const localTags = ref(props.item.tags)

watchEffect(() => {
  if (props.active) {
    localTitle.value = props.item.title
    localDescription.value = props.item.description
    localTags.value = props.item.tags?.slice()
    document.body.style.overflow = 'hidden'
  } else {
    localTitle.value = ''
    localDescription.value = ''
    localTags.value = []
    document.body.style.overflow = 'auto'
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
    tags: localTags.value,
    createdAt: props.item.createdAt
  } as ListItem
})

function getConfirmButtonLabel() {
  if (props.action === CRUD.create) {
    return 'Add'
  } else if (props.action === CRUD.update) {
    return 'Edit'
  }
}

function onChangeTags(tags: string[]) {
  localTags.value = tags
}

function onCancel() {
  emits('cancel')
}

function onConfirm() {
  emits('confirm', props.action, modifiedItem.value)
}

function onKeyDown($event: KeyboardEvent){
  if($event.key === 'Escape') {
    onCancel()
  }
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
$input-width: 348px
.item-modal
  box-sizing: content-box
  width: 350px
  height: 360px
  padding: 12px
  background-color: white
  border: none
  border-radius: 6px
  z-index: 2

  h2
    font-size: 24px
    margin-bottom: 10px

  .input-title
    display: block
    box-sizing: border-box
    width: $input-width
    height: 25px
    margin-bottom: 5px
    padding-left: 5px
    border: 1px solid #ababab
    border-radius: 2px
    &:focus
      outline: none
      border: 1px outset #004611

  .input-tags
    box-sizing: border-box
    width: $input-width
    margin-bottom: 5px
    padding: 2px 0 2px 1px

  .input-description
    display: block
    box-sizing: border-box
    width: $input-width
    height: 200px
    padding: 5px
    resize: none
    border: 1px solid #ababab
    border-radius: 2px
    &:focus
      outline: none
      border: 1px outset #004611

  .button-container
    right: 10px
    bottom: 10px
    float: right
    margin-top: 5px
    margin-right: 5px
    button
      border: none
      border-radius: 5px
      &:first-of-type
        margin-right: 5px
    .cancel-button
      padding: 5px 5px
      background-color: #efefef
      &:hover
        background-color: #a6a6a6
      &:active
        background-color: #696868

    .confirm-button
      padding: 5px 10px
      background-color: #92e7ac
      &:hover
        background-color: #57d381
      &:active
        background-color: #7bb492

</style>
