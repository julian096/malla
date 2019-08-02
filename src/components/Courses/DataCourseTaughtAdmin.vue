<template>
    <v-container grid-list-lg text-xs-center>
        <p class="display-1">Datos del curso</p>
        
        <v-card elevation="10">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Nombre</p>
                        <span class="subheading">{{Course.courseName}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Instructor</p>
                        <span class="subheading">{{Course.teacherName}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <p class="headline font-italic">Descripción</p>
                        <span class="subheading">{{Course.description}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Fecha de inicio</p>
                        <span class="subheading">{{Course.dateStart}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Fecha de cierre</p>
                        <span class="subheading">{{Course.dateEnd}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Horario</p>
                        <span class="subheading">{{Course.timetable}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Destinado a</p>
                        <span class="subheading">{{Course.courseTo}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Modalidad</p>
                        <span class="subheading">{{Course.modality}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Estado del curso</p>
                        <span class="subheading">{{Course.state}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Tipo del curso</p>
                        <span class="subheading">{{Course.typeCourse}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Aula</p>
                        <span class="subheading">{{Course.place}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Total de horas</p>
                        <span class="subheading">{{Course.totalHours}}</span>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-layout row justify-space-around v-if="!breakpoint.xs">
                    <v-flex xs3>
                        <v-btn outline block color="orange" :disabled="availablePDFList" @click="getPDFList($route.params.CursoImpartidoAdmin)">Lista de asistencia</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn outline block color="blue" :disabled="!availableButton" @click="openCalTeachers">Calificar docentes</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex xs12>
                        <v-btn outline block color="orange" :disabled="availablePDFList" @click="getPDFList($route.params.CursoImpartidoAdmin)">Obtener lista de asistencia</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn outline block color="blue" :disabled="!availableButton" @click="openCalTeachers">Calificar docentes</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>
   </v-container> 
</template>

<script>
import {mapActions} from 'vuex';
import router from '../../router';
import EventBus from '../../bus';

export default {
    name: 'DataCourseTaughtAdmin',
    data() {
        return {
            breakpoint:this.$vuetify.breakpoint,
            availableButton:null,
            availablePDFList:true,
            Course:{
                courseName:"",
                courseTo:"",
                dateStart:"",
                dateEnd:"",
                description:"",
                modality:"",
                place:"",
                state:"",
                timetable:"",
                typeCourse:"",
                totalHours:"",
                teacherName:"",
            }
        }
    },
    methods:{
        ...mapActions(['getDataCourse','teacherListToQualify','getPDFList']),

        // Abre la vista para calificar los docentes
        openCalTeachers(){
            router.push({name: 'CalDocentesAdmin'});
        }
    },
    created() {
        this.getDataCourse(this.$route.params.CursoImpartidoAdmin);
        this.teacherListToQualify(this.$route.params.CursoImpartidoAdmin);
    },
    mounted() {
        EventBus.$on('getDataCourse',response=>{
            this.Course.courseName = response.data.courseName;
            this.Course.courseTo = response.data.courseTo;
            this.Course.dateStart = response.data.dateStart.replace("T00:00:00+00:00","");
            this.Course.dateEnd = response.data.dateEnd.replace("T00:00:00+00:00","");
            this.Course.description = response.data.description;
            this.Course.modality = response.data.modality;
            this.Course.place = response.data.place;
            this.Course.timetable = response.data.timetable;
            this.Course.typeCourse = response.data.typeCourse;
            this.Course.totalHours = response.data.totalHours;
            this.Course.state = response.data.state;
            this.Course.teacherName = response.data.teacherName;
            this.availableButton = response.data.allowPoll;
        });

        EventBus.$on('suGetTeacherListToQualify',()=>{
            this.availablePDFList = false;
        });

        EventBus.$on('getPDFList',response=>{
            let name = "ListaAsistencia"+this.$route.params.CursoImpartidoAdmin.replace(" ","");
            let blob = new Blob([response.data], { type:'application/pdf' } );
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = name;
            link.target = '_blank';
            link.click();
        })
    },
}
</script>