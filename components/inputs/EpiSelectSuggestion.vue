<template>
  <div
    ref="selectWrapper"
    class="relative grid gap-2"
  >
    <label
      v-if="props.label"
      class="font-semibold"
      :for="props.label"
    >
      {{ props.label }}
    </label>
    <div class="relative">
      <i
        class="fas absolute top-[45%] transform -translate-y-1/3 ml-3"
        :class="icon"
      />
      <input
        :id="props.label"
        :value="searchTerm"
        :name="props.label ?? 'search'"
        type="search"
        autocomplete="off"
        class="w-full px-4 py-3 text-gray-700 bg-gray-100 border-transparent rounded-md border-2 focus:border-secondary-600 focus:bg-white focus:ring-0 outline-none pl-10"
        :placeholder="props.placeholder"
        @focus="onfocusSearchInput"
        @keydown.up.prevent="selectPrevious()"
        @keydown.down.prevent="selectNext()"
        @keydown.enter.prevent="selectItem"
        @input="filterItems"
      />
    </div>
    <div
      v-if="showDropdown"
      class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg top-[55px]"
    >
      <ul
        ref="list"
        class="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
      >
        <template v-for="(item, index) in filteredItems">
          <li
            v-if="item && !loading"
            :key="index"
            :class="{ 'bg-secondary-300': index === selectedIndex }"
            class="text-gray-900 cursor-pointer hover:bg-secondary-300 focus:bg-secondary-300 hover:text-gray-900 focus:text-gray-900 py-2 px-4 flex justify-between"
            @click="selectItem"
            @mouseenter="selectedIndex = index"
          >
            <div
              v-for="(key, index2) in props.labelKeys"
              :key="key"
              class="w-full overflow-hidden text-left"
              :class="index2 === 0 ? 'font-bold' : ''"
            >
              {{ capitalize(String(item[key]).toLowerCase()) }}
            </div>
          </li>
        </template>

        <li
          v-if="loading"
          class="flex items-center justify-center py-8 px-4 font-semibold text-gray-900"
        >
          <i class="fas fa-spinner text-2xl fa-spin mr-2 text-secondary-600" />
        </li>

        <li
          v-if="filteredItems.length === 0 && !props.loading"
          class="leading-6 text-gray-900 py-2 px-4 font-semibold"
        >
          Aucun résultat
        </li>
        <li
          v-if="!props.hideAddElement && !props.loading"
          :class="{ 'bg-secondary-300': selectedIndex === filteredItems.length }"
          class="text-gray-900 cursor-pointer select-none hover:bg-secondary-300 focus:bg-secondary-300 hover:text-gray-900 focus:text-gray-900 py-2 px-4 font-bold my-2"
          @click="addNewItem"
        >
          <i class="fa-solid fa-plus mr-2 text-accent" />{{ props.addLabel ? props.addLabel : 'Nouveau Élément' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType, Ref, ComputedRef } from 'vue'
import { capitalize } from '~/core/utils/formatsUtils'
import { filterBySearchText } from '~/core/utils/searchUtils'

/*  PROPS */
const props = defineProps({
  searchTerm: {
    type: String,
    required: true,
    default: '',
  },
  items: {
    type: Array as PropType<Record<string, unknown>[]>,
    required: true,
  },
  searchKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  labelKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  addLabel: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Rechercher un élément',
  },
  hideAddElement: {
    type: Boolean,
    default: false,
  },
  openDropdownOnFocus: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'sm' | 'md'>,
    default: 'md',
  },
  icon: {
    type: String,
    required: false,
    default: 'fa-magnifying-glass',
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  enabledFilterBySearchText: {
    type: Boolean,
    required: false,
    default: true,
  },
})

/*  REFS  */
const showDropdown: Ref<boolean> = ref(false)
const filteredItems: Ref<Record<string, unknown>[]> = ref(props.items)
const selectedIndex: Ref<number | null> = ref(null)
const selectWrapper = ref<HTMLElement | null>(null)
const list = ref<HTMLElement | null>(null)

/* COMPUTED */
const itemsSelected: ComputedRef<Record<string, unknown> | null> = computed(() => {
  return selectedIndex.value !== null ? filteredItems.value[selectedIndex.value] : null
})

/* LIFECYCLE */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

/* EMITS */
const emit = defineEmits<{
  'update:searchTerm': [value: string]
  itemSelected: [item: any]
  clickAdd: []
}>()

/*  METHODS */
// Open dropdown menu if the input search is focused and the openDropdownOnFocus prop is 'true'
const onfocusSearchInput = () => {
  if (props.openDropdownOnFocus) {
    showDropdown.value = true
  }
}
const handleClickOutside = (event: MouseEvent) => {
  if (!selectWrapper.value) {
    return
  }
  const wrapper = selectWrapper.value
  if (!wrapper.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

const filterItems = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:searchTerm', value)
  if (props.enabledFilterBySearchText) {
    filteredItems.value = filterBySearchText(props.items, value, props.searchKeys)
  } else {
    filteredItems.value = props.items
  }
  showDropdown.value = true
  selectedIndex.value = null
}

const getItemLabel = (item: Record<string, unknown>) => {
  return props.labelKeys.map((key) => item[key]).join(' ')
}

const selectItem = () => {
  let selectedItem = itemsSelected.value
  if (filteredItems.value.length === selectedIndex.value) {
    addNewItem()
    return
  }

  if (!selectedItem && filteredItems.value.length !== 1) {
    return
  }

  if (!selectedItem) {
    selectedItem = filteredItems.value[0] as Record<string, unknown>
  }
  emit('update:searchTerm', getItemLabel(selectedItem))
  showDropdown.value = false
  emit('itemSelected', selectedItem)
}

const selectNext = () => {
  if (selectedIndex.value === null || selectedIndex.value === filteredItems.value.length) {
    selectedIndex.value = 0
  } else if (selectedIndex.value < filteredItems.value.length) {
    selectedIndex.value++
  }
  scrollSelectedIntoView()
}

const selectPrevious = () => {
  if (selectedIndex.value) {
    selectedIndex.value--
  }
  scrollSelectedIntoView()
}

const scrollSelectedIntoView = () => {
  if (!list.value) {
    return null
  }
  const selectedItemRef = list.value?.querySelector('.bg-secondary-300')
  if (!selectedItemRef) {
    return null
  }
  const selectedItem = selectedItemRef as HTMLElement
  const itemTop = selectedItem.offsetTop
  const itemBottom = selectedItem.offsetTop + selectedItem.offsetHeight + 20
  const itemHeight = selectedItem.getBoundingClientRect().height

  if (selectedIndex.value === 0) {
    list.value.scrollTop = 0
    return
  }

  if (itemBottom > list.value.scrollTop + list.value.clientHeight) {
    const visibleItems = Math.floor(list.value.clientHeight / itemHeight)
    list.value.scrollTop = itemBottom - visibleItems * itemHeight
  } else if (itemTop < list.value.scrollTop) {
    list.value.scrollTop = itemTop
  }
}

const addNewItem = () => {
  emit('update:searchTerm', '')
  emit('clickAdd')
  showDropdown.value = false
  selectedIndex.value = null
}
</script>
