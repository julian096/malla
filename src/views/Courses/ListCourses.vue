<template>
    <v-container fluid grid-list-lg text-xs-center>

        <Navigation />
        <p class="display-1">Lista de cursos</p>

        <!-- Simbologia de colores -->
        <span class="title">Simbología de colores</span>    
        <v-layout row justify-space-around class="mt-3">
            <v-flex xs2>
                <div class="green lighten-1 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Disponible</span></div>
            </v-flex>
            <v-flex xs2>
                <div class="yellow darken-2 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Cursando</span></div>
            </v-flex>
            <v-flex xs2>
                <div class="red lighten-2 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Terminado</span></div>
            </v-flex>
        </v-layout>

        <!-- Aqui va el select para escoger el periodo -->
        <v-layout row justify-center>
            <v-flex xs12 sm6 md3 lg3>
                <v-select v-model="period"
                          :items="periods"
                          label="Seleccione un periodo"
                          solo/>
            </v-flex>
        </v-layout>
        <CardCourse :data="courses" :periodSelect="period"/>

    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardCourse from '@/components/Courses/CardCourse.vue';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'ListCourses',
    components:{Navigation, CardCourse},
    data() {
        return {
            period:"",
        }
    },
    computed:{
        ...mapState(['periods','courses']),
    },
    methods: {
        ...mapActions(['getCourses','getPeriods'])
    },
    mounted(){
        this.getPeriods();
        this.getCourses();
    }
}
</script>