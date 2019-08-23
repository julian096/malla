<template>
    <v-container  grid-list-lg text-xs-center>
        <Navigation/>
        <p class="display-1">Docentes del departamento</p>

        <CardTeachersByDep :data="teachers"/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardTeachersByDep from '@/components/Courses/CardTeachersByDep.vue';
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'TeacherOfDep',
    components:{Navigation,CardTeachersByDep},
    data() {
        return {
            breakpoint:this.$vuetify.breakpoint,
            teachers:[]
        }
    },
    computed: {
        ...mapState(['keyAuth'])
    },
    methods: {
        ...mapMutations(['createKeyAuth']),

        // Obtiene los docentes de un departamento
        async getTeachersOfDep(){
            this.createKeyAuth();
            try {
                const response = await axios.get(`/getTeachersByDep`,this.keyAuth);
                this.teachers = response.data.teachers;
            } catch (error) {
            }
        }
    },
    created(){
        this.getTeachersOfDep();
    }
}
</script>