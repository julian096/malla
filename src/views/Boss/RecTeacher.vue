<template>
    <v-container text-xs-center grid-list-lg>
        <Navigation/>
        <span class="display-1">Docentes disponibles para recomendar al curso {{$route.params.recDocente}}</span>

        <v-layout row justify-space-between v-if="arrayTeachers.length">
            <v-flex xs12>
                <v-card class="mt-4" elevation="10">
                    <template v-for="(item, index) of arrayTeachers">
                        <v-list :key="item.rfc" two-line>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{item.name}}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{item.rfc}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-layout row wrap>
                                        <v-btn class="pl-2 pr-2" round outline color="blue" @click="recTeacher(item.rfc,index)">Recomendar</v-btn>
                                    </v-layout>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                        <v-divider :key="index"></v-divider>
                    </template>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout class="mt-5" row justify-center v-else>
            <v-flex xs12>
                <span class="title">No hay peticiones para este curso</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    name: 'RecTeacher',
    components:{Navigation},
    data() {
        return {
            arrayTeachers:[]
        }
    },
    computed:{
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        // Obtiene la lista de docentes del departamento que no hayan seleccionado el curso
        async getTeachers(){
            this.createKeyAuth();
            try {
                const teachers = await axios.get("http://localhost:5000/teachersByDep/"+this.$route.params.recDocente,this.keyAuth)
                this.arrayTeachers = teachers.data.teachers;
                
            } catch (error) {
                console.error(error);
            }
        },

        // Recomienda el docente seleccionado al curso
        async recTeacher(rfc, ind){
            try {
                await axios.post("http://localhost:5000/courseRequest/"+this.$route.params.recDocente,{"rfc":rfc},this.keyAuth);
                console.log("Docente recomendado");
                this.arrayTeachers.splice(ind,1)
            } catch (error) {
                console.error(error);
            }
        }
    },
    created(){
        this.getTeachers();
    }
}
</script>