<template>
  <div class="tag-input-container">
    <span class="tag" v-for="tag in tagList" :key="tag">{{ tag }}</span>
    <input type="text" class="input-tag" @paste="onTagPaste" @keypress="onKeypress" @input="onInput"
           @keydown="onKeyDown"
           ref="input">
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  onBeforeUpdate, watch, computed
} from "vue"

const input = ref<HTMLInputElement | null>(null)
const tagList = ref<Array<string>>([])
const tagInputString = ref('')

const props = defineProps<{ tags: string[] }>()
const emits = defineEmits<{
  (e: 'changeTags', tags: string[]): void
}>()

watch(tagList.value, () => {
  emits('changeTags', tagList.value)
})

onBeforeUpdate(() => {
  tagList.value = props.tags
})

function onKeypress($event: KeyboardEvent) {
  if ($event.key === ' ') {
    if (tagInputString.value) { // falsy : ''(*), false, null(*), undefined(*), 0, NaN
      tagList.value.push(tagInputString.value)
    }
    tagInputString.value = ''
    return
  }
  if ($event.key === 'Backspace') {
    alert('backspace')
    if (tagInputString.value) {
      return
    }
    tagList.value.pop()
    return
  }
}

function onInput($event: InputEvent) {
  if (tagList.value.length === 3) {
    if (input.value != null) {
      input.value.value = ''    // disable input
    }
  }
  if ($event.data === ' ') {
    if (input.value != null) {
      input.value.value = ''
    }
    return
  }
  tagInputString.value = ($event.target as HTMLInputElement).value
}

function onKeyDown($event: KeyboardEvent) {
  if ($event.key === 'Backspace' && !input.value?.value) {
    tagList.value.pop()
  }
}
</script>

<style scoped lang="sass">
.tag-input-container
  border: 1px solid black
  border-radius: 2px

  .input-tag
    display: inline
    border: 0
    font-size: 13px
    background-color: rgba(255, 255, 255, 0)

    &:focus
      outline: none

  .tag
    //noinspection SassScssResolvedByNameOnly
    background-color: $item-tag-color
    font-size: 13px
    margin-right: 5px
    border-radius: 3px

    &:last-of-type
      margin-right: 0
</style>
