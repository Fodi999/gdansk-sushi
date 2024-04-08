<template>
  <div class="flex flex-wrap justify-center items-center m-4">
    <div class="flex flex-col p-1 bg-white rounded-lg shadow-md m-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" v-for="product in products" :key="product.id">
      <img class="h-48 w-full object-cover" :src="product.image" alt="Product image">
      <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-700">{{ product.name }}</h2>
        <p class="mt-2 text-gray-500">{{ product.description }}</p>
        <p class="mt-2 text-gray-500">{{ product.price }} pl.</p>
        
        <button @click="addToCart(product)">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useBasketStore } from '@/stores/basket.js'

export default {
  data() {
    return {
      open: false,
      products: [
        { id: 1, name: 'Product 1', description: 'This is product 1', image: 'public/Big Momo.jpg', price: 10},
        { id: 2, name: 'Product 2', description: 'This is product 2', image: 'public/Big Momo.jpg', price: 20},
        // Добавьте больше продуктов здесь...
      ]
    };
  },
  created() {
    const basketStore = useBasketStore()
    this.products.forEach(product => {
      basketStore.addToBasket(product)
    })
  },
  methods: {
    addToCart(product) {
      const basketStore = useBasketStore()
      basketStore.addToBasket(product)
    }
  }
};
</script>