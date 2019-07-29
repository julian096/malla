<template>
    <v-container text-xs-center grid-list-lg>
        <Navigation/>

        <span class="display-2">Datos del curso</span>

        <v-card elevation="10" class="mt-4">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Nombre</p>
                        <span class="subheading">{{Course.courseName}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Folio</p>
                        <span class="subheading">{{Course.serial}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Instructor</p>
                        <span class="subheading">{{teacherName}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">RFC del instructor</p>
                        <span class="subheading">{{Course.teacherRFC}}</span>
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
                        <span class="subheading">{{state}}</span>
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
                        <span class="subheading">{{totalHours}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row justify-space-around class="mt-3">
                    <v-btn outline color="orange" @click="openChangeSerial">Asignar folio</v-btn>
                </v-layout>
            </v-card-text>
        </v-card>

        <FormChangeSerial :displayChangeSerial="showFormSerial" :btnDisable="btnValue"/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import FormChangeSerial from '@/components/Forms/FormChangeSerial.vue';
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import EventBus from '@/bus.js';

export default {
    name: 'DataCourse',
    components:{Navigation, FormChangeSerial},
    data() {
        return {
            btnValue:false,
            showFormSerial:false,
            totalHours:0,
            state:"",
            teacherName:"",
            hourStart:"",
            hourEnd:"",
            serialCourse:{
                serial:""
            },
            Course:{
                courseName:"",
                courseTo:"",
                dateStart:"",
                dateEnd:"",
                description:"",
                modality:"",
                place:"",
                teacherRFC:"",
                timetable:"",
                typeCourse:"",
                serial:""
            }
        }
    },
    computed:{
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        async getDataCourse(){
            try {
                const response = await axios.get('http://localhost:5000/course/'+this.$route.params.cursoFolio,this.keyAuth);
                this.Course.courseName = response.data.courseName;
                this.Course.courseTo = response.data.courseTo;
                this.Course.dateStart = response.data.dateStart.replace("T00:00:00+00:00","");
                this.Course.dateEnd = response.data.dateEnd.replace("T00:00:00+00:00","");
                this.Course.description = response.data.description;
                this.Course.modality = response.data.modality;
                this.Course.place = response.data.place;
                this.Course.teacherRFC = response.data.teacherRFC;
                this.Course.timetable = response.data.timetable;
                this.Course.typeCourse = response.data.typeCourse;
                this.Course.serial = response.data.serial;
                this.state = response.data.state;
                this.totalHours = response.data.totalHours;
                this.teacherName = response.data.teacherName;
                this.hourStart = response.data.timetable.substr(0,5);
                this.hourEnd = response.data.timetable.substr(6);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        },
        // Cambia el folio del curso
        async editSerial(){
            commit('createKeyAuth');
            try {
                axios.put("http://localhost:5000/editSerial/"+this.$route.params.cursoFolio,this.serialCourse,  this.keyAuth);
                this.btnValue = true;
            } catch (error) {
                console.error(error);
            }
        },

        openChangeSerial(){
            this.showFormSerial = true;
        }
    },
    mounted() {
        this.getDataCourse();this.dataSeria

        EventBus.$on('sendSerial', async (dataSerial) => {
            try {
                await axios.put("http://localhost:5000/editSerial/"+this.$route.params.cursoFolio,dataSerial,this.keyAuth);
                this.Course.serial = dataSerial.serial;
                console.log(dataSerial)
            } catch (error) {
                console.error(error);
            }
        })

        EventBus.$on('closeChangeSerial', () => {
            this.showFormSerial = false;
        })
    },
}
</script>