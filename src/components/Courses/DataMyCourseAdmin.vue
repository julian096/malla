<template>
<v-container grid-list-lg text-xs-center>
        <v-snackbar v-model="snack" :timeout="timeout" top color="amber darken-3" class="white--text">Te quedan {{daysToPoll}} dias para realizar la encuesta</v-snackbar>
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
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Descripción</p>
                        <span class="subheading">{{Course.description}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Acreditación</p>
                        <span class="subheading">{{qualified}}</span>
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
                        <v-btn outline block color="orange" :disabled="!availableButton || findTeacher" @click="openFormPoll">Encuesta</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn outline block color="blue" :disabled="isApprove" @click="getPDFConst">Constancia de aprobación</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn color="red" block dark @click="dialog = true">Darse de baja</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn outline color="indigo" block :to="{name: 'CursosDelAdmin'}">Atras</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex xs12>
                        <v-btn outline block color="orange" :disabled="!availableButton || findTeacher" @click="openFormPoll">Encuesta</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn outline block color="blue" :disabled="isApprove" @click="getPDFConst">Constancia de aprobación</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn color="red" block dark @click="dialog = true">Darse de baja</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn outline color="indigo" block :to="{name: 'CursosDelAdmin'}">Atras</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
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
                                <v-btn outline color="green" @click="removeTeacher">Aceptar</v-btn>
                                <v-btn outline color="red" @click="dialog = false">Cancelar</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-container>
            </v-card>
            
        </v-dialog>
    </v-container>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex';
import router from '../../router';
import axios from 'axios';
import EventBus from '../../bus';

export default {
    name: 'DataMyCourseAdmin',
    data() {
        return {
            breakpoint:this.$vuetify.breakpoint,
            snack:null,
            timeout:5000,
            daysToPoll:0,
            availableButton:null,
            teachersThatHaveDoneThePoll:[],
            dialog:null,
            qualified:"",
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
        ...mapState(['userLoged','keyAuth']),

        // Devuelve un booleano para habilitar encuesta
        findTeacher(){
            const valor = this.teachersThatHaveDoneThePoll.includes(this.userLoged.rfc);
            this.snack = !valor;
            return valor;
        },

        // Devuelve un booleano para habilitar la constancia de acreditacion
        isApprove(){
            return (this.qualified === 'Sin calificar' || this.qualified === 'Reprobado') ? true : false;
        }
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        async getCourse(){
            this.createKeyAuth();
            try {
                const response = await axios.get(`/course/${this.$route.params.MiCursoAdmin}`,this.keyAuth);
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
                this.teachersThatHaveDoneThePoll = response.data.teachersThatHaveDoneThePoll;
                this.qualified = response.data.qualified;
            } catch (error) {        
            }
        },

        async removeTeacher(){
            try {
                await axios.get(`/removeTeacherinCourse/${this.$route.params.MiCursoAdmin}`,this.keyAuth);
                router.push({name: 'CursosDelAdmin'});
            } catch (error) {
            }
        },

        async getPDFConst(){
            try {
                const response = await axios.get(`/acreditation/${this.$route.params.MiCursoAdmin}`,this.keyAuth);
                let name = "Constancia"+this.$route.params.MiCursoAdmin.replace(" ","");
                let blob = new Blob([response.data], { type:'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = name;
                link.target = '_blank';
                link.click();
            } catch (error) {
                
            }
        },
        // Abre la vista para la encuesta de satisfacción
        openFormPoll(){
            router.push({name: 'EncuestaAdmin'});
        },
    },
    created(){
        this.getCourse();
    }
}
</script>