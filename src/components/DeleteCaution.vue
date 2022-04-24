<template>
  <teleport to="body">
    <div class="modal-container" v-show="props.active">
      <div class="delete-caution">
        <h2>Are you sure you want to delete?</h2>
        <button @click="onCancel">CANCEL</button>
        <button @click="onDelete">DELETE</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

interface CautionProps {
  title?: string
  resolve: (value: unknown) => void
  reject: () => void
  active: boolean
}

const props = defineProps<CautionProps>()

function onCancel() {
  props.reject()
}

function onDelete() {
  props.resolve(null)
}
</script>

<style scoped lang="sass">
.delete-caution
  box-sizing: content-box
  width: 300px
  height: 100px
  padding: 10px
  background-color: rgb(255, 255, 255)

  h2
    font-size: 18px
</style>
