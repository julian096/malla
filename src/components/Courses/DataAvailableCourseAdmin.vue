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
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <v-btn outline block color="orange" @click="requestCourse" :disabled="btnDisable">Solicitar curso</v-btn>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-btn outline block color="green" @click="openPetitions">Gestionar peticiones</v-btn>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-btn dark block color="blue" :to="{name:'CursosDisponiblesAdmin'}">Otros cursos</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapState, mapMutations} from 'vuex';
import router from '../../router';

export default {
    name: 'DataAvailableCourseAdmin',
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
        ...mapState(['keyAuth']),
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        // Obtiene los datos del curso
        async getDataAvailableCourse(){
            this.createKeyAuth();
            try {
                const dataCourse = await axios.get('http://localhost:5000/course/'+this.$route.params.cursoAdmin,this.keyAuth)
                this.Course.courseName = dataCourse.data.courseName;
                this.Course.courseTo = dataCourse.data.courseTo;
                this.Course.dateStart = dataCourse.data.dateStart.replace("T00:00:00+00:00","");
                this.Course.dateEnd = dataCourse.data.dateEnd.replace("T00:00:00+00:00","");
                this.Course.description = dataCourse.data.description;
                this.Course.modality = dataCourse.data.modality;
                this.Course.place = dataCourse.data.place;
                this.Course.timetable = dataCourse.data.timetable;
                this.Course.typeCourse = dataCourse.data.typeCourse;
                this.Course.totalHours = dataCourse.data.totalHours;
                this.Course.state = dataCourse.data.state;
                this.Course.teacherName = dataCourse.data.teacherName;
                console.log(dataCourse.data);
                
                // Habilita o deshabilita el boton de solicitar curso
                const user = sessionStorage.getItem("user");
                const infoCourse = await axios.get("http://localhost:5000/requestsTo/"+this.$route.params.cursoAdmin,this.keyAuth);
                let arrayRFC = [];
                for(let i of infoCourse.data){
                    arrayRFC.push(i.rfc);
                }
                if(arrayRFC.includes(user) || dataCourse.data.teachersInCourse.includes(user) || dataCourse.data.teacherRFC == user){
                    this.btnDisable = true;
                    console.log("Ya no puedes solicitar el curso");
                }
            } catch (error) {
                console.error(error);
            }
        },
        
        //solicita el curso 
        async requestCourse(){
            try {
                await axios.get("http://localhost:5000/courseRequest/"+this.$route.params.cursoAdmin,this.keyAuth);
                console.log("Solicitud enviada");

                const response = await axios.get("http://localhost:5000/inscriptionDocument/"+this.$route.params.cursoAdmin,this.keyAuth);
                let name = "inscripcion"+this.$route.params.cursoAdmin.replace(" ","");
                this.btnDisable = true;
                let blob = new Blob([response.data], { type:'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = name;
                link.target = '_blank';
                link.click();
            } catch (error) {
                console.log(error.response);
            }
        },

        // Abre la vista para gestionar las peticiones
        openPetitions(){
            router.push({name: 'PeticionCurso', params:{listaPeticion: this.Course.courseName}})
        },
    },
    created(){
        this.getDataAvailableCourse();
    }
}
</script>