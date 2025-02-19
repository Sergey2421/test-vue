<template>
  <div id="app">
    <div class="container">
      <ProductList />
      <ShoppingCart />
    </div>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

export default {
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
}
</style>