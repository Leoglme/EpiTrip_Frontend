<template>
  <aside class="text-gray-800 w-[25%] h-screen fixed top-0 left-0 overflow-auto bg-gray-50">
    <div class="flex justify-center p-4">
      <button
        v-for="category in categories"
        :key="category.name"
        :class="{
          'bg-secondary-600 text-white': selectedCategory === category.name,
          'text-secondary-700 bg-gray-100 hover:bg-gray-200': selectedCategory !== category.name,
        }"
        class="w-32 h-12 m-2 p-2 rounded-full transition-colors duration-300 ease-in-out"
        @click="selectedCategory = category.name"
      >
        <i
          :class="category.iconClass"
          :title="category.name"
        ></i>
        <!--        {{ category.name }}-->
      </button>
    </div>

    <div class="mt-10">
      <CardsEpiRoadTripCardSuggest class="my-2"></CardsEpiRoadTripCardSuggest>
      <CardsEpiRoadTripCardSuggest class="my-2"></CardsEpiRoadTripCardSuggest>
      <CardsEpiRoadTripCardSuggest class="my-2"></CardsEpiRoadTripCardSuggest>
      <CardsEpiRoadTripCardSuggest class="my-2"></CardsEpiRoadTripCardSuggest>
      <CardsEpiRoadTripCardSuggest class="my-2"></CardsEpiRoadTripCardSuggest>
      <CardsEpiRoadTripCardSuggest class="my-2"></CardsEpiRoadTripCardSuggest>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarDestination',
  data() {
    return {
      selectedCategory: null,
      categories: [
        {
          name: 'Fêter',
          iconClass: 'fas fa-cocktail',
          items: [{ id: 1, title: 'Club XYZ', description: 'Un endroit vibrant pour danser toute la nuit.' }],
        },
        {
          name: 'Dormir',
          iconClass: 'fas fa-bed',
          items: [{ id: 2, title: 'Hôtel Confort', description: 'Un séjour luxueux avec vue sur la ville.' }],
        },
        {
          name: "S'amuser",
          iconClass: 'fas fa-laugh-beam',
          items: [
            { id: 3, title: "Parc d'Attractions", description: 'Montagnes russes et jeux pour toute la famille.' },
          ],
        },
      ],
    }
  },
  computed: {
    selectedItems() {
      if (!this.selectedCategory) return []
      return this.categories.find((cat) => cat.name === this.selectedCategory)?.items || []
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    selectCategory(categoryName) {
      this.selectedCategory = categoryName
      this.isMenuOpen = false
    },
  },
}
</script>
