<template>
  <header class="bg-gray-800 text-white p-6">
    <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center">
      <div class="font-bold text-xl mb-2 sm:mb-0">
        Доставка суши Гданск
      </div>
      <div class="mb-2 sm:mb-0">
        Телефон: +7 123 456 78 90
      </div>
      <div>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <BasketVue/>
        </button>
      </div>
    </div>
  </header>
</template>
  <script>
  import BasketVue from './BasketVue.vue'
    
  export default {
    name: 'HeaderHome',
    components: {
      BasketVue
    }
  }
  </script>