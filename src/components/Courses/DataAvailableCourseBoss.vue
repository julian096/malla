<template>
    <v-container grid-list-lg text-xs-center>
        <p class="display-1">Datos del curso</p>
        <v-snackbar v-model="suSnackbar" top color="success" class="white--text">Curso solicitado con éxito</v-snackbar>
        <v-snackbar v-model="erSnackbar" top color="error" class="white--text">{{errorMsg}}</v-snackbar>

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
                        <p class="headline font-italic">Estado</p>
                        <span class="subheading">{{Course.state}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Tipo</p>
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
                <v-layout row justify-space-around v-if="!breakpoint.xs">
                    <v-flex sm3>
                        <v-btn outline block color="green" @click="requestCourse($route.params.cursoDispJefe)" :disabled="btnDisable">Solicitar curso</v-btn>
                    </v-flex>
                    <v-flex sm3>
                        <v-btn outline block color="orange" @click="openRecTeachers">Recomendar docentes</v-btn>
                    </v-flex>
                    <v-flex sm3>
                        <v-btn outline block color="indigo" :to="{name: 'CursosDisponiblesJefe'}" >Atras</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex xs12>
                        <v-btn outline block color="green" @click="requestCourse($route.params.cursoDispJefe)" :disabled="btnDisable">Solicitar curso</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn outline block color="orange" @click="openRecTeachers">Recomendar docentes</v-btn>
                    </v-flex>
                    <v-flex sm12>
                        <v-btn outline block color="indigo" :to="{name: 'CursosDisponiblesJefe'}">Atras</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex';
import router from '../../router';
import EventBus from '../../bus';

export default {
    name: 'DataAvailableCourseBoss',
    data() {
        return {
            breakpoint:this.$vuetify.breakpoint,
            suSnackbar:false,
            erSnackbar:false,
            errorMsg:"",
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
    methods:{
        ...mapActions(['getDataCourse','requestsTo','requestCourse']),

        // Abre la vista para recomendar docentes al curso
        openRecTeachers(){
            router.push({name: 'RecomendarDocente', params:{recDocente: this.Course.courseName}})
        },
    },
    created() {
        this.getDataCourse(this.$route.params.cursoDispJefe);
    },
    mounted() {
        EventBus.$on('getDataCourse',async response=>{
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

            // Habilita o deshabilita el boton de solicitar curso
            const user = sessionStorage.getItem("user");
            const infoCourse = await this.requestsTo(this.$route.params.cursoDispJefe);
            let arrayRFC = [];
            for(let i of infoCourse.data){
                arrayRFC.push(i.rfc);
            }
            if(arrayRFC.includes(user) || response.data.teachersInCourse.includes(user) || response.data.teacherRFC == user){
                this.btnDisable = true;
                console.log("Ya no puedes solicitar el curso");
            }
        });

        EventBus.$on('suRequestCourse',response=>{
            this.suSnackbar = true;
            let name = "inscripcion"+this.$route.params.cursoDispJefe.replace(" ","");
            this.btnDisable = true;
            let blob = new Blob([response.data], { type:'application/pdf' } );
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = name;
            link.target = '_blank';
            link.click();
            setTimeout(() => {
                this.suSnackbar = false;
                this.btnDisable = false;
            }, 2000);
        });

        EventBus.$on('erRequestCourse',error=>{
            this.errorMsg = error;
            this.erSnackbar = true;
            setTimeout(() => {
                this.errorMsg;
                this.erSnackbar = false;
            }, 2000);
        })
    },
}
</script>