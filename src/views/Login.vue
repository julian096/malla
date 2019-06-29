<template>
  <div>
    <Navbar />
    <div class="main">
      <video class="vid" src="../assets/login.mp4" preload loop autoplay></video>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbars/Navbar.vue';

export default {
  name: 'Login',
  components:{Navbar}
}
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
  }
  .vid{
    display: block;
    height: 100%;
    width: 100%;
  }
</style>
