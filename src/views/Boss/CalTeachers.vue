<template>
    <v-container text-xs-center>
        <Navigation/>
        <p class="display-1">Calificar docentes de {{$route.params.CursoImpartidoAdmin}}</p>
        
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
                                        <v-btn class="mr-3" dark round outline color="green" @click="app(item.rfc,index)">Aprobar</v-btn>
                                        <v-btn dark round outline color="red" @click="rep(item.rfc,index)">Reprobar</v-btn>
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
    name: 'CalTeachers',
    components:{Navigation},
    data() {
        return {
            indice:0,
            listTeacher: null,
            arrayTeachers:[]
        }
    },
    methods:{
        ...mapActions(['teacherListToQualify','approvedTeacher','repprovedTeacher']),

        // Función que envia el rfc del docente seleccionado para aprobarlo
        async app(rfc,ind){
            this.indice = ind;
            this.approvedTeacher({nameCourse:this.$route.params.CursoImpartidoJefe,body:{"rfc":rfc}});
        },

        // Elimina el item del docente seleccionado de la lista
        async rep(rfc,ind){
            this.indice = ind;
            this.repprovedTeacher({nameCourse:this.$route.params.CursoImpartidoJefe,body:{"rfc":rfc}})
        }
    },
    created() {
        this.teacherListToQualify(this.$route.params.CursoImpartidoJefe);
    },
    mounted() {
        EventBus.$on('suGetTeacherListToQualify',response=>{
            this.listTeacher = response.data.teachers;
            this.arrayTeachers = response.data.teachers;
        });

        EventBus.$on('suApprovedTeacher',()=>{
            this.arrayTeachers.splice(this.indice,1);
        });

        EventBus.$on('suRepprovedTeacher',()=>{
            this.arrayTeachers.splice(this.indice,1);
        })
    },
}
</script>