<template>
  <aside class="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 overflow-auto">
    <div class="flex justify-center">
      <button
        v-for="category in categories"
        :key="category.name"
        :class="{ 'bg-gray-600': selectedCategory === category.name }"
        class="w-32 sm:w-auto h-12 sm:h-auto m-2 sm:mx-1 p-2 hover:bg-gray-700 rounded-full"
        @click="selectedCategory = category.name"
      >
        <i
          :class="category.iconClass"
          :title="category.name"
        ></i>
      </button>
    </div>
    <div
      v-if="selectedItems.length > 0"
      class="p-4"
    >
      <ul>
        <li
          v-for="item in selectedItems"
          :key="item.id"
          class="mb-2"
        >
          <p>{{ item.title }}</p>
          <p class="text-sm">{{ item.description }}</p>
        </li>
      </ul>
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
