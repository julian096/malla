<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <span class="display-1">Mis cursos</span>

        <CardMyCourses :data="myCourses" class="mt-4" v-if="myCourses.length"/>

        <v-layout class="mt-5" row justify-center v-else>
            <v-flex xs12>
                <span class="title">No hay peticiones para este curso</span>
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