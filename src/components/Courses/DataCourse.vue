<template>
    <v-container grid-list-xl text-xs-center>
        <v-snackbar v-model="snackSu" top color="success" class="white--text">Datos actualizados correctamente</v-snackbar>
        <v-snackbar v-model="snackEr" top color="error" class="white--text">{{errorMsg}}</v-snackbar>

        <p class="display-1">Datos del curso</p>
            <!-- Formulario de datos -->
        <v-card elevation="10" v-if="update=='No'">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm3>
                        <p class="headline font-italic">Nombre</p>
                        <span class="subheading">{{Course.courseName}}</span>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <p class="headline font-italic">Descripción</p>
                        <span class="subheading">{{Course.description}}</span>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <p class="headline font-italic">Instructor</p>
                        <span class="subheading">{{teacherName}}</span>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <p class="headline font-italic">RFC del instructor</p>
                        <span class="subheading">{{Course.teacherRFC}}</span>
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
            </v-card-text>
            <v-card-actions>
                <v-layout row wrap>
                    <v-flex xs12 sm3>
                        <v-btn outline block color="orange" @click="update = 'Si'">Actualizar</v-btn>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <v-btn outline block color="blue" :disabled="availablePDFList" @click="getPDFList">Lista de asistencia</v-btn>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <v-btn dark block color="red" @click="dialog = true">Eliminar</v-btn>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <v-btn outline block color="indigo" :to="{name: 'Cursos'}">Atras</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>

            <!-- Formulario para actualizar datos del usuario -->
        <v-card elevation="10" v-else>
            <v-form>
                <v-card-text>
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
                </v-card-text>
                <v-card-actions>
                    <v-layout row justify-space-around v-if="!breakpoint.xs">
                        <v-flex xs3>
                            <v-btn outline block color="green" :disabled="buttonDis" @click="updateCourse">Guardar</v-btn>
                        </v-flex>
                        <v-flex xs3>
                            <v-btn outline block color="red" @click="update = 'No'">Cancelar</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap v-else>
                        <v-flex xs12>
                            <v-btn outline block color="green" :disabled="buttonDis" @click="updateCourse">Guardar</v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn outline block color="red" @click="update = 'No'">Cancelar</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-form>
        </v-card>

            <!-- confirmación de eliminacion del curso -->
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
                                <p class="subheading">¿Estas seguro que quieres eliminar el curso?</p>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex>
                                <v-btn outline color="green" @click="deleteCourse">Aceptar</v-btn>
                            </v-flex>
                            <v-flex>
                                <v-btn outline color="red" @click="dialog = false">Cancelar</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-container>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
import {ValidationProvider} from 'vee-validate';
import {mapMutations, mapState} from 'vuex';
import router from '../../router';
import axios from 'axios';

export default {
    name: 'DataCourse',
    components:{ValidationProvider},
    data() {
        return {
            breakpoint: this.$vuetify.breakpoint,
            snackSu:false,
            snackEr:false,
            errorMsg:"",
            buttonDis:false,
            availablePDFList:true,
            dialog:null,
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
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),
        
        allowedMinutes: v => v <= 1 && v <= 11,

        // Obtiene los datos del curso y habilita o no descargar la lista de asistencia
        async getCourse(){
            this.createKeyAuth();
            try {
                const response = await axios.get(`/course/${this.$route.params.curso}`, this.keyAuth);
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
    
                await axios.get(`/teacherList/${this.$route.params.curso}`,this.keyAuth);
                this.availablePDFList = false;
                
            } catch (error) {
                console.error(error);
            }
        },

        // Actualiza los datos del curso
        async updateCourse(){
            this.Course.timetable = this.hourStart + '-' + this.hourEnd;
            try {
                await axios.put(`/course/${this.$route.params.curso}`, this.Course, this.keyAuth);
                this.snackSu = true;
                this.buttonDis = true;
                setTimeout(() => {
                    this.snackSu = false;
                    this.getDataCourse(this.$route.params.curso);
                    this.update = 'No';
                    this.buttonDis = false;
                }, 2000);
            } catch (error) {
                this.errorMsg = error.response.data.message;
                this.snackEr = true;
                setTimeout(() => {
                    this.snackEr = false;
                }, 2000);
            }
        },

        // Elimina el curso
        async deleteCourse(){
            try {
                await axios.delete(`/course/${this.$route.params.curso}`,this.keyAurh);
                this.dialog = false
                router.push({name:"Cursos"})
            } catch (error) {
            }
        },

        // descarga el PDF de la lista de asistencia
        async getPDFList(){
            try {
                const response = await axios.get(`/course/${this.$route.params.curso}/assistantList`,this.keyAuth);
                let name = "ListaAsistencia"+this.$route.params.curso.replace(" ","");
                let blob = new Blob([response.data], { type:'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = name;
                link.target = '_blank';
                link.click();
            } catch (error) {
                
            }
        }
    },
    created(){
        this.getCourse();
    }
}
</script>