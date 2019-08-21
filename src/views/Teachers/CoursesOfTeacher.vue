<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <p class="display-1">Cursos tomados por el docente</p>
        <v-layout justify-center>
            <v-flex xs2>
                <v-select label="Selecciona año"
                          v-model="year"
                          solo/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import axios from 'axios';

export default {
    name: 'CoursesOfTeacher',
    components:{Navigation},
    data() {
        return {
            year:""
        }
    },
}
</script>