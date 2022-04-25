<template>
  <teleport to="body">
    <div class="modal-container" v-show="props.active">
      <div class="delete-confirm">
        <h2 class="content-font">Are you sure you want to delete<span v-if="title.length > 0">&nbsp;<span class="delete-item-title">{{
            title
          }}</span></span>?
        </h2>
        <div class="button-container">
          <button class="ui-font cancel-button" @click="onCancel">Cancel</button>
          <button class="ui-font delete-button" @click="onDelete">Delete</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";

interface CautionProps {
  title?: string
  resolve: (value: unknown) => void
  reject: () => void
  active: boolean
}

const props = defineProps<CautionProps>()

const title = computed(() => {
  if (props.title === undefined || props.title.length === 0) {
    return ''
  }
  return `"${props.title}"`
})

function onCancel() {
  props.reject()
}

function onDelete() {
  props.resolve(null)
}
</script>

<style scoped lang="sass">
.delete-confirm
  position: relative
  box-sizing: border-box
  width: 500px
  height: 130px
  padding: 30px
  background-color: rgb(255, 255, 255)
  z-index: 3
  border-radius: 10px

  .button-container
    position: absolute
    right: 0
    bottom: 0
    margin-right: 30px
    margin-bottom: 15px

  h2
    font-size: 18px

    .delete-item-title
      font-size: 16px
      color: #b24545
      padding: 2px
      border-radius: 5px
      background-color: #faebd7ff

  button
    margin-left: 4px
    padding: 5px 10px
    font-size: 15px
    border: none
    border-radius: 5px

  .cancel-button
    background-color: #efefef

    &:hover
      background-color: #a6a6a6

    &:active
      background-color: #696868

  .delete-button
    background-color: #ff7d7d

    &:hover
      background-color: #ef1010

    &:active
      background-color: #8c0000
</style>
