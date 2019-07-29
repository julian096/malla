<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <span class="display-1">Mis cursos</span>

        <p class="title mt-4">Simbología de colores</p>   
        <v-layout row justify-space-around class="mt-3" v-if="!breakpoint.xs">
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
        <v-layout row wrap class="mt-3" v-else>
            <v-flex xs12>
                <div class="green lighten-1 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Disponible</span></div>
            </v-flex>
            <v-flex xs12>
                <div class="yellow darken-2 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Cursando</span></div>
            </v-flex>
            <v-flex xs12>
                <div class="red lighten-2 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Terminado</span></div>
            </v-flex>
        </v-layout>

        <CardMyCourses :data="myCourses" class="mt-4" v-if="myCourses.length"/>

        <v-layout class="mt-5" row justify-center v-else>
            <v-flex xs12>
                <span class="title">Aun no has cursado ningun curso</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardMyCourses from '@/components/Courses/CardMyCourses.vue';
import { mapState, mapActions } from "vuex";

export default {
    name: 'MyCoursesAdmin',
    components:{Navigation,CardMyCourses},
    data() {
        return {
            breakpoint: this.$vuetify.breakpoint
        }
    },
    computed:{
        ...mapState(['myCourses'])
    },
    methods:{
        ...mapActions(['getMyCourses'])
    },
    created() {
        this.getMyCourses()
    },
}
</script>