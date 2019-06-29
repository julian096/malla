<template>
    <v-container grid-list-lg text-xs-center>

        <Navigation/>
        <p class="display-1">Cursos disponibles</p>
        <!-- Simbologia de colores -->
        <span class="title">Simbología de colores</span>    
        <v-layout row justify-space-around class="mt-3">
            <v-flex xs2>
                    <div class="green lighten-1 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Disponible</span></div>
            </v-flex>
            <v-flex xs2>
                    <div class="yellow darken-2 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Cursando</span></div>
            </v-flex>
        </v-layout>
        <CardAvailableCourse :data="availableCourses"/>

    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardAvailableCourse from '@/components/Courses/CardAvailableCourse.vue';
import {mapState,mapActions} from 'vuex';

export default {
    name: 'AvailableCourses',
    components:{Navigation,CardAvailableCourse},
    computed:{
        ...mapState(['availableCourses'])
    },
    methods: {
        ...mapActions(['getAvailableCourses'])
    },
    mounted() {
        this.getAvailableCourses();
    },
}
</script>