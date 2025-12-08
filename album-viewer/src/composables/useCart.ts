import { ref, computed } from 'vue'
import type { Album } from '../types/album'

export interface CartItem extends Album {
  quantity: number
}

export function useCart() {
  const cartItems = ref<CartItem[]>([])

  // Add album to cart (increase quantity if already exists)
  const addToCart = (album: Album): void => {
    const existingItem = cartItems.value.find((item) => item.id === album.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({
        ...album,
        quantity: 1
      })
    }
  }

  // Remove album from cart (completely)
  const removeFromCart = (albumId: number): void => {
    const index = cartItems.value.findIndex((item) => item.id === albumId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  // Get cart item count (sum of all quantities)
  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  // Get total cart price
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // Get all cart items
  const getCartItems = () => cartItems.value

  // Clear entire cart
  const clearCart = (): void => {
    cartItems.value = []
  }

  // Check if album is in cart
  const isInCart = (albumId: number): boolean => {
    return cartItems.value.some((item) => item.id === albumId)
  }

  return {
    cartItems: computed(() => cartItems.value),
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    getCartItems,
    clearCart,
    isInCart
  }
}
