<template>
  <div class="item-card">
    <h2>{{ props.listItem.title }}</h2>
    <div class="tag-container">
      <mark v-for="tag in props.listItem.tags" :key="tag">{{ tag }}</mark>
    </div>
    <p class="summary">{{ props.listItem.description?.substring(0, 10) }}</p>
    <footer>
      <div class="button-container">
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      </div>
      <p class="created-at">{{ props.listItem.createdAt }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue"

/*
* 현재버전의 Vue3 + typescript 에서는 아래의 문법(reference interface)을 지원하지 않음
* import {ListItem} from "@/types/CommonTypes";
* const props = defineProps<ListItem>()
* https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
*/

interface ListItem {
  id?: number,
  description?: string,
  title?: string,
  tags?: string[],
  createdAt?: string
}
interface cardContent {
  listItem: ListItem
}
const props = defineProps<cardContent>()
</script>

<style scoped lang="sass">
$button-padding-size: 5px 10px 5px 10px
$card-width: 240px
$card-padding-left: 10px

.item-card
  font-size: 13px
  font-family: 'nanum gothic light', 'sans-serif'

  position: relative

  box-sizing: border-box
  width: $card-width
  height: 9rem
  padding: 10px 10px 10px 10px

  border: 1px solid gainsboro
  border-radius: 0.3rem

  box-shadow: 1px 1px 5px 3px #f5f5f5

  h2
    font-family: 'nanum gothic', 'sans-serif'
    font-size: 28px

    margin-bottom: 1px

  mark
    margin-left: 10px

  .summary
    margin-left: 1px

  button
    margin-right: 5px

  .edit-button
    padding: $button-padding-size

    border: none
    border-radius: 2px

    background-color: #92e7ac

  .delete-button
    padding: $button-padding-size

    border: none
    border-radius: 2px

  footer
    display: flex
    width: $card-width - 5px

  .button-container
    position: absolute
    bottom: 10px
    left: 10px

  .created-at
    position: absolute
    bottom: 10px
    right: 8px
</style>
