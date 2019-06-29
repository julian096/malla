<template>
    <div class="main">
        <Navigation />
        <div class="foto">
            <img class="imagen" src="../assets/home.jpg" alt="tec">
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import {mapMutations} from 'vuex';

export default {
    name: 'Inicio',
    components:{Navigation},
}
</script>

<style scope>
    .foto{
        width: 100%;
        height: 100vh;
    }
    .imagen{
        display: block;
        height: 100%;
        width: 100%;
    }
</style>