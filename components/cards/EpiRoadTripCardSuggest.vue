<template>
  <div
    class="flex max-w-xl overflow-hidden bg-white shadow-lg rounded-lg mx-6 hover:scale-105 transform transition duration-500 ease-in-out cursor-pointer"
  >
    <div class="w-1/3">
      <img
        class="object-cover w-full h-full"
        src="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
        alt="Restaurant Image"
      />
    </div>

    <div class="w-2/3 p-4">
      <div class="flex justify-between">
        <h1 class="text-lg font-bold text-gray-900 truncate">CIBELES</h1>
        <svg
          class="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        ></svg>
      </div>

      <div class="mt-1 flex items-center">
        <span class="text-xs font-semibold text-white bg-yellow-300 rounded-full px-2 py-1 mr-2">4.6/5</span>
        <span class="text-xs font-semibold text-gray-500">26 avis</span>
      </div>

      <div class="mt-3 flex items-center text-sm text-gray-600">
        <span>FERMÉ</span>
        <span class="mx-2">•</span>
        <span>Ouvre à 19h00</span>
      </div>

      <div class="mt-4 flex">
        <button class="text-xs text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded focus:outline-none">
          Lire la suite
        </button>
        <button
          class="ml-2 text-xs text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded focus:outline-none"
          onclick="location.href='tel:+0223052228'"
        >
          02.23.05.22.28
        </button>
      </div>
    </div>
  </div>
</template>
