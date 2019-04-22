<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-flex xs4 v-for="(product, i) in products" :key="i">
        <Product :product="product"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Product from "@/components/Product.vue";
import axios from "axios";

export default {
  name: "home",
  components: {
    Product
  },
  data() {
    return {
      products: []
    };
  },
  created() {
    axios
      .get('http://localhost:3000/products')
      .then(({ data }) => {
        this.products = data
      })
      .catch(err => {
        console.log(err.message)
      })
  }
};
</script>
