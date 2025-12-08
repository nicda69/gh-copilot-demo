<template>
  <div class="cart-overlay" @click="closeCart">
    <div class="cart-panel" @click.stop>
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button class="close-btn" @click="closeCart" aria-label="Close cart">✕</button>
      </div>

      <div class="cart-content">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>🛒</p>
          <p class="empty-message">Your cart is empty</p>
          <p class="empty-description">Start adding albums to build your collection!</p>
        </div>

        <div v-else class="cart-items-list">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image">
              <img 
                :src="item.image_url" 
                :alt="item.title"
                @error="handleImageError"
              />
            </div>

            <div class="item-details">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-artist">{{ item.artist }}</p>
              <div class="item-price">
                <span class="price">${{ item.price.toFixed(2) }}</span>
                <span class="quantity">× {{ item.quantity }}</span>
              </div>
            </div>

            <div class="item-actions">
              <button 
                class="remove-btn" 
                @click="removeItem(item.id)"
                :aria-label="'Remove ' + item.title + ' from cart'"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="cart-total">
          <span class="label">Total:</span>
          <span class="amount">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
        <button class="continue-shopping-btn" @click="closeCart">Continue Shopping</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const emit = defineEmits<{
  close: []
}>()

const { cartItems, cartTotal, removeFromCart } = useCart()

const removeItem = (albumId: number): void => {
  removeFromCart(albumId)
}

const closeCart = (): void => {
  emit('close')
}

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/100x100/667eea/white?text=Album'
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cart-panel {
  background: white;
  height: 100vh;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #999;
}

.empty-cart p:first-child {
  font-size: 3rem;
  margin: 0 0 1rem 0;
}

.empty-message {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.empty-description {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
}

.cart-item:hover {
  background: #f0f0f0;
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

.item-artist {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
  color: #666;
}

.item-price {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
}

.price {
  font-weight: 600;
  color: #667eea;
}

.quantity {
  color: #999;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  color: #666;
}

.remove-btn:hover {
  transform: scale(1.2);
  color: #ff6b6b;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 2px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.label {
  color: #666;
}

.amount {
  color: #667eea;
  font-size: 1.4rem;
}

.checkout-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.continue-shopping-btn {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  background: rgba(102, 126, 234, 0.2);
}

@media (max-width: 768px) {
  .cart-panel {
    max-width: 100%;
  }

  .cart-header h2 {
    font-size: 1.2rem;
  }

  .item-image {
    width: 70px;
    height: 70px;
  }

  .item-title {
    font-size: 0.85rem;
  }
}
</style>
