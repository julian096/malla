<template>
    <v-container grid-list-lg text-xs-center>

        <Navigation/>
        <p class="display-1">Cursos tomados por {{teacherName}}</p>

        <v-layout justify-center>
            <v-flex xs2>
                <v-select label="Seleccione año"
                          v-model="year"
                          :items="itemsSelect"
                          solo/>
            </v-flex>

        </v-layout>
        <CardCoursesOfTeacher :data="coursesOfTeacher" :year="year"/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import axios from 'axios';
import {mapState, mapMutations} from 'vuex';
import CardCoursesOfTeacher from '@/components/Courses/CardCoursesOfTeacher.vue';

export default {
    name: 'CoursesOfTeacher',
    components:{Navigation, CardCoursesOfTeacher},
    data() {
        return {
            year:"",
            itemsSelect:[],
            coursesOfTeacher:[],
            teacherName:""
        }
    },
    computed: {
        ...mapState(['keyAuth'])        
    },
    methods: {
        ...mapMutations(['createKeyAuth'])
    },
    async created() {
        this.createKeyAuth();
        try {
            const response = await axios.get(`/teacher/${this.$route.params.CursosDelDocente}`,this.keyAuth);
            this.teacherName = `${response.data.name} ${response.data.fstSurname} ${response.data.sndSurname}`;
            const data = await axios.get(`/getYears`,this.keyAuth);
            const courses = await axios.get(`/coursesOf/${this.$route.params.CursosDelDocente}`,this.keyAuth);
            this.coursesOfTeacher = courses.data.courses;
            for(let i of data.data.years){
                this.itemsSelect.push(i);
            }
        } catch (error) {
        }
    },
}
</script>