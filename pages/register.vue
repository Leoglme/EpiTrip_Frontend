<template>
  <section class="p-4 vh-100 flex items-start justify-center lg:min-h-items-center">
    <div class="container-xs">
      <div class="flex flex-col gap-4">
        <RegisterComponent />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import RegisterComponent from '~/components/forms/RegisterForm.vue'
</script>
