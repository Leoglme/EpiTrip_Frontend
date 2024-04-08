<template>
  <div>
    <EpiModal
      :show="props.show"
      :show-left-button="false"
      :show-right-button="false"
      @update:show="emit('update:show', $event)"
    >
      <RegisterForm
        @click:login="emit('click:login')"
        @ok="emit('update:show', false)"
      />
    </EpiModal>
  </div>
</template>

<script lang="ts" setup>
import EpiModal from '~/components/modals/EpiModal.vue'
import RegisterForm from '~/components/forms/RegisterForm.vue'

/* PROPS */
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

/* EMITS */
const emit = defineEmits<{
  'update:show': [value: boolean]
  'click:login': []
}>()
</script>
