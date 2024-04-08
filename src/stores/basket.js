import { defineStore } from 'pinia'

export const useBasketStore = defineStore({
  id: 'basket',
  state: () => ({
    items: []
  }),
  getters: {
    itemCount: (state) => (id) => {
      const item = state.items.find(item => item.id === id)
      return item ? item.quantity : 0
    },
    totalItemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  actions: {
    addToBasket(item) {
      const foundItem = this.items.find(i => i.id === item.id)
      if (foundItem) {
        foundItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    removeFromBasket(item) {
      const foundItem = this.items.find(i => i.id === item.id)
      if (foundItem) {
        foundItem.quantity--
        if (foundItem.quantity === 0) {
          const index = this.items.indexOf(foundItem)
          this.items.splice(index, 1)
        }
      }
    }
  }
})