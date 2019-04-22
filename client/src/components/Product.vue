<template>
  <v-hover>
    <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="600">
      <v-img :aspect-ratio="16/9" :src="product.image">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >{{ product.price }}</div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-4" style="position: relative;">
        <v-btn absolute color="primary" class="white--text" fab large right top>
          <v-icon @click="addCart">add_shopping_cart</v-icon>
        </v-btn>
        <div class="font-weight-light secondary--text title mb-2">{{ product.description }}</div>
        <h3 class="display-1 font-weight-light primary--text mb-2">
          <router-link :to="{ name: 'product-detail', params: { id: product._id }}" id="name">{{ product.name }}</router-link>
        </h3>
        <div class="font-weight-light title mb-2">Stock: {{ product.stock }}</div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'product',
  props: ['product'],
  methods: {
    addCart: function() {
      Axios
        .post('http://localhost:3000/carts', {
          item: [{
            productId: this.product._id
          }]
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

#name {
  text-decoration: none
}
</style>
