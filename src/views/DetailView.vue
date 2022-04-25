<template>
  <div class="detail-view-container">
    <p class="item-title">{{ item?.title }}</p>
    <div class="item-tags"></div>
    <p class="item-created-at">{{ item?.createdAt }}</p>
    <p class="item-description">{{ item?.description }}</p>
    <div class="button-container">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onBeforeMount, ref} from "vue";
import {findItem} from "@/utils/localStorage-api";
import {ListItem} from "@/types/common-types";

const route = useRoute()
const item = ref<ListItem>()

onBeforeMount(() => {
  item.value = findItem(route.params.item as string)
})

</script>

<style scoped>

</style>
