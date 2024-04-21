<template>
  <div class="max-w-md m-8">
    <div class="bg-white rounded-lg border border-gray-200 shadow-lg w-full h-[140px] grid grid-cols-[140px,1fr]">
      <img
        class="rounded-l-lg object-cover h-[140px] w-full"
        src="https://places.googleapis.com/v1/places/ChIJNa9xaDTeDkgRppR8PQv-2hc/photos/ATplDJYizHTcvP-yMHnJvvtUwo_xqlLNr6NO2K_ql-L-JoEH3r-2pnSqBHdvCFyvHYUQjDmhdyXHHs_bHwr80Uyyj_eRhvAwW4Z8JXC1pjWuRZ2mz4X426Wbiyze8lNnTvgzw3Z7EXJ81fICJegwdaqyuZ6gv2u3hXJKjGl-/media?key=AIzaSyDOlfHq98YjL9fXgS6cKenA0eoyPNVvrD8&amp;maxHeightPx=400&amp;maxWidthPx=400"
        alt="Sushi Shop"
      />
      <div class="px-4 py-3 grid grid-cols-[1fr,auto]">
        <div>
          <h5 class="text-gray-900 text-lg font-medium mb-2">Sushi Shop</h5>
          <div class="flex items-center mb-1">
            <span class="text-green-700 font-semibold text-sm">3.3/5 </span
            ><span class="text-gray-500 text-xs ml-2"> (564 reviews) </span>
          </div>
          <div class="p-4 rounded-lg">
            <div class="text-green-500">Ouvert ⋅ Ferme à 23:00</div>
            <!--v-if-->
          </div>
          <div class="text-gray-800 text-xs">0 826 82 66 28</div>
        </div>
        <!-- Actions Buttons -->
        <div class="grid gap-1 items-center border-l">
          <button
            class="flex group items-center justify-center gap-2 rounded-full py-3 px-4 text-[14px] font-medium transition-all duration-300 ease-in-out cursor-pointer active:scale-95 bg-secondary-600 text-white hover:bg-secondary-700 flex-row w-10 h-10"
            title="Voir sur la carte"
          >
            <!--v-if--><i
              class="fas fa-map-marker-alt"
              aria-hidden="true"
            ></i>
          </button>
          <button
            class="flex group items-center justify-center gap-2 rounded-full py-3 px-4 text-[14px] font-medium transition-all duration-300 ease-in-out cursor-pointer active:scale-95 bg-transparent text-secondary-600 border border-secondary-600 hover:bg-secondary-600 hover:text-white flex-row w-10 h-10"
            title="Ajouter au road trip"
          >
            <!--v-if--><i
              class="fas fa-plus"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
