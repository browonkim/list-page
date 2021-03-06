<template>
  <div class="tag-input-container">
    <mark v-for="tag in tagList" :key="tag" class="content-font">{{ tag }}</mark>
    <input type="text" class="input-tag content-font" @paste="onPaste" @keypress="onKeypress" @input="onInput"
           @keydown="onKeyDown" ref="input" :placeholder="placeHolder" @focusout="onFocusOut">
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

const placeHolder = computed(() => {
  if (tagList.value?.length === 0 && !input.value?.value) {
    return 'Tag'
  }
  return ''
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

function onPaste($event: ClipboardEvent) {
  const pastedString = $event.clipboardData?.getData('text')
  const concatenatedString = (tagInputString.value ?? '') + (pastedString ?? '')
  if (concatenatedString.trim() === '') {
    return
  }
  if (tagList.value.length < 3) {
    tagList.value.push(...pastedString?.split(' ').slice(0, 3 - tagList.value.length) ?? [])
  }
  if (input.value) {
    input.value.value = ''
  }
}

function onInput($event: InputEvent) {
  if (tagList.value.length === 3) {
    if (input.value) {
      input.value.value = ''    // disable input
    }
  }
  if ($event.data === ' ') {
    if (input.value) {
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

function onFocusOut() {
  if (input.value && input.value.value) {
    if (tagList.value.length < 3) {
      tagList.value.push(input.value.value)
      input.value.value = ''
    }
  }
}
</script>

<style scoped lang="sass">
.tag-input-container
  width: 20px
  height: 28px
  padding-left: 5px
  border: 1px solid #ababab
  border-radius: 2px
  &:focus-within
    outline: none
    border: 1px outset #004611
  background-color: white

  .input-tag
    display: inline
    height: 20px
    padding-left: 5px
    border: 0
    font-size: 13px
    background-color: rgba(255, 255, 255, 0)

    &:focus
      outline: none

  mark
    //noinspection SassScssResolvedByNameOnly
    background-color: $item-tag-color
    font-size: 13px
    margin-right: 5px
    border-radius: 3px
    padding: 1px
    margin-bottom: 3px

    &:first-of-type
      margin-left: 5px

    &:last-of-type
      margin-right: 0
</style>
