<template>
  <div class="product-list">
    <p>Курс: {{ exchangeRate }}</p>
    <div class="groups">
      <div v-for="(group,index) in groups" :key="group" class="group">
        <div class="group_name" :class="{
          'border-b-none': !group.visible,
         'border-t-none': index === 0,
         'empty_group': !products.some(p => p.group === group.name)
        }" @click="group.visible = !group.visible" >{{ group.name }}</div>
        <div v-if="group.visible" v-for="(product,idx) in filterProductsByGroup(group)" :key="product.id"  @click.stop>
          <div class="goods" :class="{'border-b-none': idx === filterProductsByGroup(group).length-1}">
            <div class="product_name">{{ product.name + ` (${product.count})` }}</div>
            <div class="cost">Цена: {{ (product.price * exchangeRate).toFixed(2) }} ₽</div>
            <button class="add_button" @click="addToCart(product)"><Cart/>Купить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Cart from "@/assets/icons/cart.vue";

export default {
  components: {Cart},
  computed: {
    ...mapState(['products', 'groups', 'exchangeRate'])
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    addToCart(product) {
      this.ADD_TO_CART(product);
    },
    filterProductsByGroup(group) {
      return this.products.filter(prd=> prd.group === group.name);
    }
  },
}
</script>

<style scoped>
.product-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.groups {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #aaa;
}
.group_name {
  box-sizing: border-box;
  padding: 15px;
  border-bottom: 2px solid #aaa;
  border-top: 2px solid #aaa;
  font-weight: 700;
  font-family: sans-serif;
}
.goods {
  box-sizing: border-box;
  margin: 0 7px;
  padding: 7px 0;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #aaa;
}
.product_name {
  max-width: 400px;
}
.add_button {
  background: #008cff;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: none;
  width: 90%;
  height: 30px;
  color: white;
  border-radius: 5px;
  padding: 0 20px;
  justify-self: end;
}
.cost {
  border: 1px solid #aaa;
  padding: 3px;
  border-radius: 5px;
  text-align: center;
  width: 130px;
}
.border-b-none {
  border-bottom: none;
}
.border-t-none {
  border-top: none;
}
.empty_group {
  color: rgba(170, 170, 170, 0.8);
  pointer-events: none;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
</style>