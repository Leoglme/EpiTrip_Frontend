<template>
  <button
    :class="[
      'flex group items-center justify-center gap-2 rounded-full py-1.5 px-4 text-[14px] font-medium transition-all ' +
        'duration-300 ease-in-out cursor-pointer active:scale-95',
      props.buttonType === 'fill'
        ? 'bg-secondary-300 text-white hover:bg-secondary-400'
        : 'bg-transparent text-secondary-300 border border-secondary-300 hover:bg-secondary-300 hover:text-white',
      props.iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row',
    ]"
  >
    <i
      v-if="props.icon"
      :class="[
        'fa',
        props.icon,
        'text-base transition-all duration-300 ease-in-out',
        props.buttonType === 'fill' ? 'text-white' : 'text-secondary-300 hover:text-white group-hover:text-white',
      ]"
    ></i>
    <slot>Button Text</slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

/*  PROPS */
const props = defineProps({
  buttonType: {
    type: String as PropType<'fill' | 'outline'>,
    default: 'fill',
  },
  icon: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
})
</script>
