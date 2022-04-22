<template>
  <div class="item-modal">
    <h2>{{ getHeaderLabel() }}</h2>
    <input placeholder="Title" class="input-title">
    <textarea placeholder="Description" class="input-description"></textarea>
    <div class="button-container">
      <button>CANCEL</button>
      <button>{{ getOkButtonLabel() }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue"
import {CRUD} from "@/types/common-types"

interface ModalProps {
  action: CRUD,
  title?: string,
  description?: string,
  tag: string[]
}

const props = defineProps<ModalProps>()

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

</script>

<style scoped lang="sass">
$input-width: 340px

.item-modal
  box-sizing: content-box
  width: 350px
  height: 360px
  padding: 10px

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
