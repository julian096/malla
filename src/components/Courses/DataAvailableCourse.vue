<template>
    <v-container grid-list-lg text-xs-center>
        <span class="display-2">Datos del curso</span>

        <v-card elevation="10" class="mt-4">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 md6>
                        <p class="headline font-italic">Nombre del curso</p>
                        <span class="subheading">{{Course.courseName}}</span>
                    </v-flex>
                    <v-flex xs12 md6>
                        <p class="headline font-italic">Nombre del instructor</p>
                        <span class="subheading">{{Course.teacherName}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <p class="headline font-italic">Descripción</p>
                        <span class="subheading">{{Course.description}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap class="mt-4">
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Fecha de inicio</p>
                        <span class="subheading">{{Course.dateStart}}</span>
                    </v-flex>
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Fecha de cierre</p>
                        <span class="subheading">{{Course.dateEnd}}</span>
                    </v-flex>
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Horario</p>
                        <span class="subheading">{{Course.timetable}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap class="mt-4">
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Destinado a</p>
                        <span class="subheading">{{Course.courseTo}}</span>
                    </v-flex>
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Modalidad</p>
                        <span class="subheading">{{Course.modality}}</span>
                    </v-flex>
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Estado del curso</p>
                        <span class="subheading">{{Course.state}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap class="mt-4">
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Tipo del curso</p>
                        <span class="subheading">{{Course.typeCourse}}</span>
                    </v-flex>
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Aula</p>
                        <span class="subheading">{{Course.place}}</span>
                    </v-flex>
                    <v-flex xs12 md4>
                        <p class="headline font-italic">Total de horas</p>
                        <span class="subheading">{{Course.totalHours}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row justify-space-around class="mt-3">
                    <v-btn outline color="orange" @click="requestCourse" :disabled="btnDisable">Solicitar curso</v-btn>
                    <v-btn dark color="blue" @click="showAvailableCourses">Otros cursos</v-btn>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import {ValidationProvider} from 'vee-validate';
import axios from 'axios';
import {mapState, mapMutations} from 'vuex';
import router from '../../router';
import EventBus from '@/bus.js'

export default {
    name: 'DataAvailableCourse',
    data() {
        return {
            btnDisable:false,
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
    computed:{
        ...mapState(['keyAuth'])
    }
    ,
    methods: {
        ...mapMutations(['createKeyAuth']),

        // Obtiene los datos del curso disponible
        async getDataAvailableCourse(){
            this.createKeyAuth();
            await axios.get('http://localhost:5000/course/'+this.$route.params.cursoDisp,this.keyAuth)
            .then(response => {
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
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })
        },

        // Registra al docente en un curso y descarga el PDF de inscripcion
        async requestCourse(){
            await axios.get("http://localhost:5000/courseRequest/"+this.$route.params.cursoDisp,this.keyAuth)
            .then(response => {
                console.log("Peticion enviada");
            })
            .catch(error => {
                console.error(error);
            })

            await axios.get("http://localhost:5000/inscriptionDocument/"+this.$route.params.cursoDisp,this.keyAuth)
            .then(response => {
                let name = "inscripcion"+this.$route.params.cursoDisp.replace(" ","");
                this.btnDisable = true;
                let blob = new Blob([response.data], { type:'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = name;
                link.target = '_blank';
                link.click();
            })
            .catch(error => {
                console.error(error);
            })
        },

        // Redirecciona a los cursos disponibles
        showAvailableCourses(){
            router.push({name: 'CursosDisponibles'});
        }
    },
    mounted() {
        this.getDataAvailableCourse();
    },
}
</script>