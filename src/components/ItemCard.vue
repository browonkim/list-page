<template>
  <div class="item-card-container">
    <h2>{{ props.listItem.title }}</h2>
    <div class="tag-container">
      <mark v-for="tag in props.listItem.tags" :key="tag">{{ tag }}</mark>
    </div>
    <p class="summary">{{ props.listItem.description }}</p>
    <footer>
      <div class="button-container">
        <button class="edit-button" @click.stop="onEdit">Edit</button>
        <button class="delete-button" @click.stop="onDelete">Delete</button>
      </div>
      <p class="created-at">{{ props.listItem.createdAt }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from "vue"
import {ListItem} from "@/types/common-types";

interface cardContent {
  listItem: ListItem
}

const props = defineProps<cardContent>()

const emits = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()

function onEdit() {
  if (props.listItem.id != undefined) {
    emits('edit', props.listItem.id)
  }
}

function onDelete() {
  if (props.listItem.id != undefined) {
    emits('delete', props.listItem.id)
  }
}
</script>

<style scoped lang="sass">
$button-padding-size: 5px 10px 5px 10px
$card-width: 240px
$card-padding-left: 10px

.item-card-container
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
    font-size: 20px
    margin-bottom: 1px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  h2::-webkit-scrollbar
    display: none
    direction: rtl

  .tag-container
    margin: 5px 0

    mark
      font-size: 12px
      font-weight: bold
      margin-left: 1px
      margin-right: 5px
      padding: 1px 2px
      border-radius: 3px
      //noinspection SassScssResolvedByNameOnly
      background-color: $item-tag-color

  .summary
    margin-left: 1px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  button
    margin-right: 5px

  .edit-button
    padding: $button-padding-size
    border: none
    border-radius: 2px
    background-color: #92e7ac

    &:hover
      background-color: #57d381

    &:active
      background-color: #7bb492

  .delete-button
    padding: $button-padding-size
    border: none
    border-radius: 2px

    &:hover
      background-color: #ff7d7d

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
