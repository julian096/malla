<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <p class="display-1">Cursos impartidos</p>

        <CardCourseTaught :data="coursesTaught" v-if="coursesTaught.length"/>

        <v-layout class="mt-5" row justify-center v-else>
            <v-flex xs12>
                <span class="title">No hay peticiones para este curso</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardCourseTaught from '@/components/Courses/CardCourseTaught.vue';
import {mapState,mapActions} from 'vuex';

export default {
    name: 'CoursesTaughtAdmin',
    components:{Navigation,CardCourseTaught},
    computed: {
        ...mapState(['coursesTaught'])
    },
    methods:{
        ...mapActions(['getCoursesTaught']),
    },
    created() {
        this.getCoursesTaught();
    },
}
</script>