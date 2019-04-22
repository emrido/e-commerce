<template>
    <v-container>
      <v-layout>
        <v-flex xs6 style="background-color: green;">
          <v-img
            :src="product.image"
            max-height="50rem"
            contain
          />
        </v-flex>
        <v-flex xs6 style="background-color: blue;">
          <v-flex xs12 style="background-color: grey;">
            <span class="subheading">Product Detail</span>
            <h1 class="display-4">{{ product.name }}</h1>
          </v-flex>
          <v-flex xs12 style="background-color: orange;">
            <h3 class="display-2">
              {{ product.description }}
            </h3>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'product-detail',
  data () {
    return {
      product: ''
    }
  },
  created () {
    axios
      .get('http://localhost:3000/products/' + this.$route.params.id)
      .then(({ data }) => {
        this.product = data
      })
      .catch(err => {
        if(err) {
          swal(err.response.data.message)
          this.$router.push('/')
        }
      })
  }
}
</script>

<style>
</style>
