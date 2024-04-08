import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', () => {
  const basket = ref([])

  function addToBasket(item) {
    basket.value.push(item)
  }

  function removeFromBasket(item) {
    const index = basket.value.findIndex(basketItem => basketItem.id === item.id)
    if (index !== -1) {
      basket.value.splice(index, 1)
    }
  }

  return { basket, addToBasket, removeFromBasket }
})