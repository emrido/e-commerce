<template>
  <v-app>
    <v-toolbar app dark elevation-0 color="accent">
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" id="wo">
          <span>WARUNG</span>
          <span class="font-weight-light">ONLINE</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!isLogin">
      <v-btn to="/login" flat color="primary">login</v-btn>
      <v-btn to="/signup" flat color="primary">signup</v-btn>
      </div>
      <v-btn flat color="primary" v-else>
        <v-badge
          color="secondary"
          left
        >
          <template v-slot:badge>
            <span>6</span>
          </template>
          <v-icon
            medium
            color="primary"
          >shopping_cart</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>WARUNG ONLINE &copy; {{ new Date().getFullYear() }}</div>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {},
  data() {
    return {
      isLogin: localStorage.getItem('token') ? true : false
    };
  },
  created() {
    this.isLogin = localStorage.getItem('token') ? true : false
  }
};
</script>

<style>
#wo {
  text-decoration: none;
  /* color: white; */
}
</style>
