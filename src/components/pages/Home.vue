<template>
  <Header></Header>
  <SectionDescuento></SectionDescuento>
  <SectionGames></SectionGames>
  <AllGames></AllGames>
  <Footer></Footer>  
</template>

<script>

import SectionDescuento from "../home/SectionDescuento.vue";
import SectionGames from "../home/SectionGames.vue"
import AllGames from "../home/AllGames.vue"
import Header from "../principal/Header.vue";
import Footer from "../principal/Footer.vue";

export default {

  data() {
    return {
    }
  },
  mounted() {
   
  },
  components: {
    SectionDescuento,
    SectionGames,
    AllGames,
    Header,
    Footer
  },
}
</script>

<style scoped>

</style>
