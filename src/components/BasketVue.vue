<template>
 <button @click="isOpen = true" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
    Открыть корзину ({{ basketStore.totalItemCount }})
  </button>
  <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="p-4">
          <div v-for="item in basketItems" :key="item.id" class="border-2 border-gray-300 p-4 rounded-lg">
    <h2 class="font-bold text-xl mb-2">{{ item.name }}</h2>
    <p class="text-gray-700 mb-2">{{ item.description }}</p>
    <p class="text-gray-700 mb-2">{{ item.price }} pl.</p>
    <img class="h-20 w-36 object-cover mb-2" :src="item.image" alt="Product image">
    <p class="text-gray-700 mb-2">Количество: {{ basketStore.itemCount(item.id) }}</p>
    <button @click="removeFromBasket(item)" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
      Удалить из корзины
    </button>
  </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <div class="p-4 bg-white rounded shadow">
  <p class="text-gray-800 text-lg font-semibold">Общая сумма: <span class="text-green-500">{{ basketStore.totalPrice }} pl.</span></p>
  <p class="text-gray-800 text-lg font-semibold">Общее количество: <span class="text-green-500">{{ basketStore.totalItemCount }}</span></p>
</div>
          <button @click="isOpen = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Закрыть корзину
          </button>
          <button @click="submitOrder" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
    Отправить заказ
  </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBasketStore } from '@/stores/basket'
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const basketStore = useBasketStore()
    const isOpen = ref(false)

    const submitOrder = async () => {
      try {
        const response = await axios.post('https://gdansk-sushi.vercel.app/orders', 
        {
          items: basketStore.items,
          totalPrice: basketStore.totalPrice,
          totalItemCount: basketStore.totalItemCount
        })

        if (response.status === 200) {
          console.log('Заказ успешно отправлен')
          // Очистите корзину после успешной отправки заказа
          basketStore.clearBasket()
        } else {
          console.log('Произошла ошибка при отправке заказа')
        }
      } catch (error) {
        console.error('Произошла ошибка при отправке заказа:', error)
      }
    }

    return {
      basketItems: basketStore.items,
      isOpen,
      removeFromBasket: basketStore.removeFromBasket,
      basketStore,
      totalPrice: basketStore.totalPrice,
      totalItemCount: basketStore.totalItemCount,
      submitOrder
    }
  }
}
</script>