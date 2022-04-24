<template>
  <teleport to="body">
    <div class="modal-container" v-show="isActivate" @wheel.prevent>
      <div class="item-modal" @activate="activateModal">
        <h2>{{ getHeaderLabel() }}</h2>
        <input placeholder="Title" class="input-title">
        <textarea placeholder="Description" class="input-description"></textarea>
        <div class="button-container">
          <button @click="cancelModal">CANCEL</button>
          <button>{{ getOkButtonLabel() }}</button>
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

const isActivate = ref(false)

function getHeaderLabel() {
  if (props.action === CRUD.create) {
    return 'Add Item'
  } else if (props.action === CRUD.update) {
    return 'Edit Item'
  }
}

function getOkButtonLabel() {
  if (props.action === CRUD.create) {
    return 'ADD'
  } else if (props.action === CRUD.update) {
    return 'EDIT'
  }
}

function activateModal() {
  isActivate.value = true;
}

function onConfirm() {
  emits('confirm', props.action, modifiedItem.value)
}
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

  h2
    font-size: 24px
    margin-bottom: 10px

  .input-title, .input-tag
    display: block
    width: $input-width
    height: 25px
    margin-bottom: 10px

  .input-description
    display: block
    box-sizing: border-box
    width: $input-width + 8px
    height: 200px
    padding: 5px
    resize: none

</style>
