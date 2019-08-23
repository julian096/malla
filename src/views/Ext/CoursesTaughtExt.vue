<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <p class="display-1">Cursos impartidos</p>

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

        <CardCourseTaught :data="coursesTaught" v-if="coursesTaught.length"/>

        <v-layout class="mt-5" row justify-center v-else>
            <v-flex xs12>
                <span class="title">No impartes ningún curso</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardCourseTaught from '@/components/Courses/CardCourseTaught.vue';
import {mapState,mapActions} from 'vuex';

export default {
    name: 'CoursesTaughtExt',
    components:{Navigation,CardCourseTaught},
    data() {
        return {
            breakpoint: this.$vuetify.breakpoint
        }
    },
    computed:{
        ...mapState(['coursesTaught'])
    },
    methods:{
        ...mapActions(['getCoursesTaught'])
    },
    mounted() {
        this.getCoursesTaught();
    }
}
</script>