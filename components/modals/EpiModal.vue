<template>
  <div
    :class="props.show ? 'opacity-100 z-50 top-20' : 'opacity-0 -z-10 top-16'"
    class="overflow-x-hidden overflow-y-auto fixed inset-0 outline-none transition-all focus:outline-none justify-center flex"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div
        class="relative rounded-lg shadow"
        :class="[props.show ? 'opacity-100' : 'opacity-0', props.bgClass]"
      >
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-4 rounded-t border-gray-600"
          :class="{ 'border-b': props.title }"
        >
          <h3
            v-if="props.title"
            class="text-xl font-semibold text-white"
          >
            {{ props.title }}
          </h3>
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent text-lg rounded-lg w-8 h-8 flex justify-center ml-auto items-center hover:bg-gray-800 hover:text-white"
            data-modal-toggle="authentication-modal"
            @click="setShow(false)"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <slot />
        </div>
        <!-- Modal footer -->
        <div
          v-if="props.showLeftButton || props.showRightButton"
          class="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-600"
        >
          <button
            v-if="props.showLeftButton"
            type="button"
            class="active:translate-y-1 translate-y-0 transform duration-100 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600"
            @click="onCancel"
          >
            Annuler
          </button>
          <EpiButton
            v-if="props.showLeftButton"
            type="button"
            @click="onOK"
          >
            Confirmer
          </EpiButton>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="props.show"
    class="opacity-30 fixed inset-0 z-40 bg-black"
  ></div>
</template>

<script lang="ts" setup>
import EpiButton from '~/components/buttons/EpiButton.vue'

/* PROPS */
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  showLeftButton: {
    type: Boolean,
    default: true,
  },
  showRightButton: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: null,
  },
  bgClass: {
    type: String,
    default: 'bg-white',
  },
})

/* EMITS */
const emit = defineEmits<{
  cancel: []
  ok: []
  'update:show': [value: boolean]
}>()

/* METHODS */
const setShow = (value: boolean) => emit('update:show', value)

const onCancel = () => {
  setShow(false)
  emit('cancel')
}
const onOK = () => {
  setShow(false)
  emit('ok')
}
</script>

<style scoped>
.transition-all {
  transition-property: opacity, top;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.5s;
}
</style>
