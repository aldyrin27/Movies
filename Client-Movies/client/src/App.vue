<template>
  
  <div>
    <Navbar />
    <RouterView />
    <Footer />
  </div>

</template>

<script>

import {RouterLink, RouterView} from 'vue-router'
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name : "App",
  components : {
    Navbar,
    Footer
  }
}
</script>

<style>

</style>