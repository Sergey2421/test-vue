<template>
  <div class="shopping-cart">
    <p class="gray">Обновление через: {{ showTime }}</p>
    <div class="items_list_container">
      <div v-for="item in cart" :key="item.id" class="item">
        <div class="cart_group">{{ item.group }}</div>
        <div class="cart_item_name">{{ item.name }}</div>
        <div class="item_count">{{ item.quantity }}</div>
        <div class="item_cost">₽ {{ (item.price * exchangeRate).toFixed(2) }}</div>
        <button class="item_delete" @click="removeFromCart(item.name)"><Garbage/></button>
      </div>
      <div class="gray total">Общая стоимость: <h3 class="black">₽ {{ totalPrice.toFixed(2) }}</h3></div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Garbage from "@/assets/icons/garbage.vue";

export default {
  components: {Garbage},
  data() {
    return {
      time: 1500
    }
  },
  computed: {
    ...mapState(['cart', 'exchangeRate']),
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity * this.exchangeRate, 0);
    },
    showTime() {
      const temp = this.time.toString().split('')
      if (temp.length === 2) temp.unshift('0')
      temp.splice(-2, 0, '.');
      return temp.join('');
    }
  },
  methods: {
    ...mapMutations(['REMOVE_FROM_CART']),
    removeFromCart(productId) {
      this.REMOVE_FROM_CART(productId);
    },
    decrementTime() {
      if (this.time === 0) this.time = 1500
        this.time -= 1;
    }
  },
  created() {
    this.$store.dispatch('fetchProducts');
    setInterval(() => {
      this.$store.dispatch('fetchProducts');
      this.$store.dispatch('updateExchangeRate');
    }, 15000);
    setInterval(() => {
      this.decrementTime();
    }, 10);
  }
}
</script>
<style scoped>
.shopping-cart {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.items_list_container {
  box-sizing: border-box;
  width: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}
.item {
  padding: 5px 0;
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: auto 1fr 70px 100px 30px;
  align-items: center;
}
.cart_group {
  width: fit-content;
  padding: 3px;
  background: rgba(255, 198, 109, 0.25);
  color: #ffb000;
  border-radius: 5px;
  border: 1px solid #ffb000;
}
.cart_item_name {
  margin-left: 5px;
  justify-self: start;
  padding: 3px;
}
.item_count, .item_cost {
  border: 1px solid #aaa;
  padding: 3px;
  border-radius: 5px;
}
.item_count {
  width: 30px;
}
.item_cost {
  width: fit-content;
}
.item_delete {
  border: none;
  border-radius: 5px;
  background: red;
  padding: 5px;
}
.total {
  margin-top: 20px;
}
.total > h3 {
  margin: 5px 0;
}
.gray {
  color: darkslategray;
}
.black {
  color: black;
}
</style>