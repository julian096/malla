<template>
    <v-container grid-list-lg text-xs-center>
        <v-snackbar v-model="snack" :timeout="timeout" top color="amber darken-3" class="white--text">Te quedan {{daysToPoll}} dias para realizar la encuesta</v-snackbar>
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
                    <v-btn outline color="orange" :disabled="!availableButton || findTeacher" @click="openFormPoll">Encuesta de satisfacción</v-btn>
                    <v-btn color="red" dark @click="dialog = true">Darse de baja</v-btn>
                </v-layout>
            </v-card-text>
        </v-card>

        <!-- confirmación de eliminacion del docente -->
        <v-dialog v-model="dialog" max-width="350" persistent>
            <v-card>
                <v-toolbar card color="red lighten-2" dark>
                    <v-icon>warning</v-icon>
                    <v-toolbar-title>Advertencia</v-toolbar-title>
                </v-toolbar>
                <v-container text-xs-center>    
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <span class="subheading">¿Estas seguro que quieres darte de baja del curso?</span>
                            </v-flex>
                            <v-flex class="mt-4">
                                <v-btn flat color="green" @click="removeTeacherInCourse">Aceptar</v-btn>
                                <v-btn flat color="red" @click="dialog = false">Cancelar</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-container>
            </v-card>
            
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapState, mapMutations} from 'vuex';
import router from '../../router';

export default {
    name: 'DataMyCourse',
    data() {
        return {
            snack:null,
            timeout:5000,
            daysToPoll:0,
            availableButton:null,
            teachersThatHaveDoneThePoll:[],
            dialog:null,
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
        ...mapState(['keyAuth','userLoged']),

        // Devuelve un booleano para habilitar encuesta
        findTeacher(){
            const valor = this.teachersThatHaveDoneThePoll.includes(this.userLoged.rfc);
            this.snack = !valor;
            return valor;
        }
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        //obtiene los datos del curso
        async getDataCourse(){
            this.createKeyAuth();
            await axios.get('http://localhost:5000/course/'+this.$route.params.MiCurso,this.keyAuth)
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
                this.availableButton = response.data.allowPoll;
                this.snack = response.data.allowPoll;
                this.daysToPoll = response.data.leftDays;
                this.teachersThatHaveDoneThePoll = response.data.teachersThatHaveDoneThePoll
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })
        },

        // Abre la vista para la encuesta de satisfacción
        openFormPoll(){
            router.push({name: 'Encuesta'});
        },

        // pide un body que es redundante, decirle mañana
        async removeTeacherInCourse(){
            this.createKeyAuth();
            await axios.get("http://localhost:5000/removeTeacherinCourse/"+this.$route.params.MiCurso,this.keyAuth)
            .then(response => {
                console.log("Dado de baja con éxito");
                router.push({name: 'MisCursos'})
            })
            .catch(error => {
                console.error(error);
            })
        }
    },
    created(){
        this.getDataCourse();
    }
}
</script>