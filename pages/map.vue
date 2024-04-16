<template>
  <div class="grid grid-cols-[450px,1fr] h-screen">
    <SidebarDestination class="z-10" />
    <div class="flex-grow">
      <MapboxMap />
    </div>
  </div>
</template>

<script>
import MapboxMap from '~/components/navigations/MapBox.vue'
import SidebarDestination from '~/components/navigations/SidebarDestination.vue'

export default {
  components: {
    SidebarDestination,
    MapboxMap,
  },
}
</script>
