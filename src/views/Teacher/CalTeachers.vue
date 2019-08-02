<template>
    <v-container text-xs-center>
        <Navigation/>
        <p class="display-1">Calificar docentes de {{$route.params.CursoImpartido}}</p>
        
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
                                        <v-btn class="mr-3" dark round outline color="green" @click="approvedTeacher(item.rfc,index)">Aprobar</v-btn>
                                        <v-btn dark round outline color="red" @click="repproveTeacher(item.rfc,index)">Reprobar</v-btn>
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
import {mapState, mapMutations} from 'vuex';
import axios from 'axios';

export default {
    name: 'CalTeachers',
    components:{Navigation},
    data() {
        return {
            listTeacher: null,
            arrayTeachers:[]
        }
    },
    computed:{
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        // Obtiene la lista completa de los docentes dentro del curso
        async getListTeacher(){
            this.createKeyAuth();
            await axios.get("/teacherListToQualify/"+this.$route.params.CursoImpartido,this.keyAuth)
            .then(response => {
                this.listTeacher = response.data.teachers;
                this.arrayTeachers = response.data.teachers;
                console.log(this.arrayTeachers);
            })
            .catch(error => {
                console.error(error)
            })
        },

        // Función que envia el rfc del docente seleccionado para aprobarlo
        async approvedTeacher(rfc,ind){
            try {
                await axios.put("/approvedCourse/"+this.$route.params.CursoImpartido,{"rfc":rfc},this.keyAuth)    
                console.log("Aprobado "+rfc);
                this.arrayTeachers.splice(ind,1);
            } catch (error) {
                console.error(error);
            }
        },

        // Elimina el item del docente seleccionado de la lista
        async repproveTeacher(rfc,ind){
            try {
                await axios.put("/failedCourse/"+this.$route.params.CursoImpartido,{"rfc":rfc},this.keyAuth)
                console.log("Reprobado "+rfc);
                this.arrayTeachers.splice(ind,1);
            } catch (error) {
                console.error(error);   
            }
        }
    },
    created() {
        this.getListTeacher();
    },
}
</script>