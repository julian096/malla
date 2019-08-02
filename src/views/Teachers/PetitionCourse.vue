<template>
    <v-container text-xs-center>
        <Navigation/>
        <span class="display-1">Docentes que solicitan el curso {{$route.params.listaPeticion}}</span>

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
                                        <v-btn class="mr-3" dark round outline color="green" @click="acceptTeacherInCourse(item.rfc,index)">Aceptar</v-btn>
                                        <v-btn dark round outline color="red" @click="rejectTeacherOfCourse(item.rfc,index)">Rechazar</v-btn>
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
import {mapActions} from 'vuex';
import EventBus from '../../bus';

export default {
    name: 'PetitionCourse',
    components:{Navigation},
    data() {
        return {
            indice:0,
            arrayTeachers:[]
        }
    },
    methods:{
        ...mapActions(['requestsTo','acceptPetitionTeacher','rejectPetitionTeacher']),
    
        //acepta el docente en el curso
        async acceptTeacherInCourse(rfc,ind){
            this.indice = ind;
            this.acceptPetitionTeacher({nameCourse:this.$route.params.listaPeticion,body:{"rfc":rfc}});
        },

        //rechaza el docente en el curso
        async rejectTeacherOfCourse(rfc,ind){
            this.indice = ind;
            this.rejectPetitionTeacher({nameCourse:this.$route.params.listaPeticion,body:{"rfc":rfc}});
        }
    },
    created() {
        this.requestsTo(this.$route.params.listaPeticion);
    },
    mounted() {
        EventBus.$on('suRequestsTo',response=>{
            this.arrayTeachers = response.data;
            console.log(this.arrayTeachers);
        });

        EventBus.$on('suAcceptPetition',()=>{
            this.arrayTeachers.splice(this.indice,1);
        });

        EventBus.$on('suRejectPetition',()=>{
            this.arrayTeachers.splice(this.indice,1);
        })
    },
}
</script>