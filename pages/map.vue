<template>
  <div class="flex h-screen">
    <SidebarDestination class="z-10" />
    <div class="flex-grow">
      <MapboxMap />
    </div>
  </div>
</template>

<script>
import MapboxMap from '~/components/navigations/MapBox.vue'
import SidebarDestination from '~/components/navigations/SideBar.vue'

export default {
  components: {
    SidebarDestination,
    MapboxMap,
  },
}
</script>
