<template>
  <div>
    <Navbar />
    <div>
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
  .vid{
    height: 100%;
    width: 100%;
  }
</style>
