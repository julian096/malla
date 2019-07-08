<template>
    <v-container grid-list-xl text-xs-center>

        <span class="display-2">Datos del curso</span>

        <!-- Formulario de datos -->
        <v-card elevation="10" v-if="update=='No'" class="mt-4">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 md6>
                        <p class="headline font-italic">Nombre del curso</p>
                        <span class="subheading">{{Course.courseName}}</span>
                    </v-flex>
                    <v-flex xs12 md6>
                        <p class="headline font-italic">Descripción</p>
                        <span class="subheading">{{Course.description}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 md6>
                        <p class="headline font-italic">Nombre del instructor</p>
                        <span class="subheading">{{teacherName}}</span>
                    </v-flex>
                    <v-flex xs12 md6>
                        <p class="headline font-italic">RFC del instructor</p>
                        <span class="subheading">{{Course.teacherRFC}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
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
                <v-layout row wrap>
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
                        <span class="subheading">{{state}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
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
                        <span class="subheading">{{totalHours}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row justify-space-around>
                    <v-btn outline color="orange" @click="update = 'Si'">Actualizar</v-btn>
                    <v-btn outline color="blue" :disabled="availablePDFList" @click="getPDFList">Obtener lista de asistencia</v-btn>
                    <v-btn dark color="red" @click="dialog = true">Eliminar</v-btn>
                </v-layout>
            </v-card-text>
        </v-card>

        <!-- Formulario para actualizar datos del usuario -->
        <v-card elevation="10" class="mt-4" v-else>
            <v-card-text>
                <v-form>
                    <v-layout row wrap>
                        <v-flex xs6 md6 lg6>
                            <ValidationProvider name="name" rules="required">
                                <v-text-field v-model="Course.courseName"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Nombre del curso"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs6 md6 lg6>
                            <ValidationProvider name="RFC" rules="required|alpha_num|length:13">
                                <v-text-field v-model="Course.teacherRFC"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="RFC del Instructor"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <ValidationProvider name="description" rules="required">
                                <v-textarea v-model="Course.description"
                                            slot-scope="{errors, valid}"
                                            :error-messages="errors"
                                            :success="valid"
                                            label="Descripción del curso" rows="2"
                                            required/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md3 lg3>
                            <ValidationProvider name="dateStart" rules="required">
                            <v-menu ref="menuDateStart"
                            slot-scope="{errors, valid}"
                            transition="slide-y-transition"
                            :close-on-content-click="false"
                            v-model="menuDateStart"
                            left>
                                <v-text-field slot="activator"
                                              v-model="Course.dateStart"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Fecha de inicio"
                                              prepend-icon="event"
                                              required />
                                <v-date-picker v-model="Course.dateStart"
                                               header-color="red lighten-2"
                                               color="light-blue lighten-2"
                                               locale="es-419">
                                               <v-spacer></v-spacer>
                                               <v-btn flat color="green" @click="$refs.menuDateStart.save(Course.dateStart)">Aceptar</v-btn>
                                </v-date-picker>
                            </v-menu>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm6 md3 lg3>
                            <ValidationProvider name="dateEnd" rules="required">
                                <v-menu ref="menuDateEnd"
                                transition="slide-y-transition"
                                slot-scope="{errors, valid}"
                                :close-on-content-click="false"
                                v-model="menuDateEnd"
                                left>
                                <v-text-field slot="activator"
                                              v-model="Course.dateEnd"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Fecha de cierre"
                                              prepend-icon="event"
                                              required />
                                <v-date-picker v-model="Course.dateEnd"
                                               header-color="red lighten-2"
                                               color="light-blue lighten-2"
                                               locale="es-419">
                                               <v-spacer></v-spacer>
                                               <v-btn flat color="green" @click="$refs.menuDateEnd.save(Course.dateStart)">Aceptar</v-btn>
                                </v-date-picker>
                            </v-menu>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm6 md3 lg3>
                            <ValidationProvider name="hourStart" rules="required">
                            <v-menu ref="menuHourStart"
                            transition="slide-y-transition"
                            slot-scope="{errors, valid}"
                            :close-on-content-click="false"
                            v-model="menuHourStart"
                            left>
                                <v-text-field slot="activator"
                                              v-model="hourStart"
                                              label="Hora de inicio"
                                              :error-messages="errors"
                                              :success="valid"
                                              prepend-icon="access_time"
                                              required />
                                <v-time-picker v-model="hourStart"
                                               :allowed-minutes="allowedMinutes"
                                               header-color="red lighten-2"
                                               color="light-blue lighten-2"
                                               format="24hr">
                                               <v-spacer></v-spacer>
                                               <v-btn flat color="green" @click="$refs.menuHourStart.save(hourStart)">Aceptar</v-btn>
                                </v-time-picker>
                            </v-menu>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm6 md3 lg3>
                            <ValidationProvider name="hourEnd" rules="required">
                            <v-menu ref="menuHourEnd"
                            transition="slide-y-transition"
                            slot-scope="{errors,valid}"
                            :close-on-content-click="false"
                            v-model="menuHourEnd"
                            left>
                                <v-text-field slot="activator"
                                              v-model="hourEnd"
                                              label="Hora de cierre"
                                              :error-messages="errors"
                                              :success="valid"
                                              prepend-icon="access_time"
                                              required />
                                <v-time-picker v-model="hourEnd"
                                               :allowed-minutes="allowedMinutes"
                                               header-color="red lighten-2"
                                               color="light-blue lighten-2"
                                               format="24hr">
                                               <v-spacer></v-spacer>
                                               <v-btn flat color="green" @click="$refs.menuHourEnd.save(hourEnd)">Aceptar</v-btn>
                                </v-time-picker>
                            </v-menu>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm3>
                            <ValidationProvider name="courseTo" rules="required">
                                <v-text-field v-model="Course.courseTo"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Destinado a"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm3>
                            <ValidationProvider name="modality" rules="required">
                                <v-select v-model="Course.modality"
                                          slot-scope="{errors, valid}"
                                          :error-messages="errors"
                                          :success="valid"
                                          :items="['Presencial','Virtual']"
                                          label="Modalidad"
                                          required/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm3>
                            <ValidationProvider name="modality" rules="required">
                                <v-select v-model="Course.typeCourse"
                                          slot-scope="{errors, valid}"
                                          :error-messages="errors"
                                          :success="valid"
                                          :items="['Profesional','Docente']"
                                          label="Tipo de curso"
                                          required/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm3>
                            <ValidationProvider name="modality" rules="required">
                                <v-text-field v-model="Course.place"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Aula"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-space-around>
                        <v-btn outline color="green" @click="updateCourse">Guardar</v-btn>
                        <v-btn outline color="red" @click="update = 'No'">Cancelar</v-btn>
                    </v-layout>
                </v-form>
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
                                <span class="subheading">¿Estas seguro que quieres eliminar el curso?</span>
                            </v-flex>
                            <v-flex class="mt-4">
                                <v-btn flat color="green" @click="deleteCourse">Aceptar</v-btn>
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
import {ValidationProvider} from 'vee-validate';
import axios from 'axios';
import {mapState,mapMutations} from 'vuex';
import router from '../../router';

export default {
    name: 'DataCourse',
    components:{ValidationProvider},
    data() {
        return {
            availablePDFList:true,
            dialog:null,
            timeout:2500,
            menuDateStart:false,
            menuDateEnd:false,
            menuHourStart:false,
            menuHourEnd:false,
            update:"No",
            teacherName:"",
            hourStart:"",
            hourEnd:"",
            totalHours:0,
            state:"",
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
                typeCourse:""
            }
        }
    },
    computed:{
        ...mapState(['keyAuth']),
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        allowedMinutes: v => v <= 1 && v <= 11,

        // Elimina un curso
        async deleteCourse(){
            await axios.delete("http://localhost:5000/course/"+this.$route.params.curso,this.keyAuth)
            .then(response => {
                this.dialog = false
                router.push({name:"Cursos"})
            })
            .catch(error => {
                console.error(error);
            })
        },

        // Actualiza los datos del curso
        async updateCourse(){
            this.Course.timetable = this.hourStart + '-' + this.hourEnd;
            await axios.put("http://localhost:5000/course/"+this.$route.params.curso,this.Course,this.keyAuth)
            .then(response => {
                this.update = 'No';
                router.push("/cursos/"+this.Course.courseName);
            })
            .catch(error => {
                console.error(error);
            })
        },

        //Obtiene la lista de asistencia del curso
        async getTeachersList(){
            await axios.get("http://localhost:5000/teacherList/"+this.$route.params.curso,this.keyAuth)
            .then(response => {
                this.availablePDFList = false;
            })
            .catch(error => {
                console.error(error);
            })
        } ,

        // Obtiene la lista de asistencia del curso
        async getPDFList(){
            await axios.get("http://localhost:5000/course/"+this.$route.params.curso+"/assistantList",this.keyAuth)
            .then(response => {
                console.log("PDF descargado");
                let name = "ListaAsistencia"+this.$route.params.curso.replace(" ","");
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
        // Obtiene los datos del curso
        async getDataCourse(){
            this.createKeyAuth();
            await axios.get('http://localhost:5000/course/'+this.$route.params.curso,this.keyAuth)
            .then(response => {
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
                this.state = response.data.state;
                this.totalHours = response.data.totalHours;
                this.teacherName = response.data.teacherName;
                this.hourStart = response.data.timetable.substr(0,5);
                this.hourEnd = response.data.timetable.substr(6);
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            })
        }
    },
    mounted(){
        this.getDataCourse();
        this.getTeachersList();
    }
}
</script>