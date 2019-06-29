<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <h1>Cursos impartidos</h1>

        <CardCourseTaught :data="coursesTaught"/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardCourseTaught from '@/components/Courses/CardCourseTaught.vue';
import {mapState,mapActions} from 'vuex';

export default {
    name: 'CoursesTaught',
    components:{Navigation,CardCourseTaught},
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