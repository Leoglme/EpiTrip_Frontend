<template>
  <component
    :is="tag"
    :to="props.to"
    class="px-3 translate-y-0 transform duration-100 active:translate-y-0.5 flex items-center gap-3 rounded-md hover:bg-[rgba(255,255,255,0.1)] py-2 cursor-pointer text-base font-medium w-full"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
/* PROPS */
import { computed } from 'vue'

const props = defineProps({
  to: {
    type: String,
    default: null,
  },
})

/* COMPUTED */
const tag = computed(() => {
  return props.to ? 'router-link' : 'button'
})
</script>
