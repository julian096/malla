<template>
    <v-container text-xs-center>
        <v-snackbar :value="snackbars.snackbarSuCourse" :timeout="timeout" top color="gray" class="light-green--text text--accent-3">Curso registrado con éxito</v-snackbar>
        <v-snackbar :value="snackbars.snackbarErCourse" :timeout="timeout" top color="red darken-4" class="white--text">Error, verifique correctamente los datos</v-snackbar>

        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step color="red lighten-2" :complete="step > 1" step="1">Datos generales</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step color="red lighten-2" :complete="step > 1" step="2">Horario</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step color="red lighten-2" step="3">Datos extra</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
            <!-- Formulario 1 -->
                <v-stepper-content step="1">
                    <ValidationObserver ref="obs1">
                        <v-card slot-scope="{invalid, validated}">
                            <v-form>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="nameCourse" rules="required|alpha_spaces">
                                                <v-text-field slot-scope="{errors, valid}"
                                                              v-model="Course.courseName"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="Nombre del curso"
                                                              required />
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="RFC" rules="required|alpha_num|length:13">
                                                <v-text-field slot-scope="{errors, valid}"
                                                              v-model="Course.teacherRFC"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="RFC del instructor"
                                                              required />
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12>
                                            <ValidationProvider name="Description" rules="required|max:200">  
                                                <v-textarea slot-scope="{errors, valid}"
                                                            v-model="Course.description"
                                                            :error-messages="errors"
                                                            :success="valid"
                                                            label="Descripción"
                                                            clearable
                                                            rows="3"
                                                            required />
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="place" rules="required|alpha_num">
                                                <v-text-field slot-scope="{errors, valid}"
                                                              v-model="Course.place"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="Aula"
                                                              required />
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn outline color="green" :disabled="invalid || !validated" @click="step=2">Siguiente</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </ValidationObserver>
                </v-stepper-content>

                <!-- Formulario 2 -->
                <v-stepper-content step="2">
                    <ValidationObserver ref="obs2">
                        <v-card slot-scope="{invalid, validated}">
                            <v-form>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <ValidationProvider name="DateStart" rules="required">
                                                <v-menu ref="menuDateStart"
                                                        slot-scope="{errors,valid}"
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
                                                                      readonly
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
                                        <v-flex xs12 md6 lg6>
                                            <ValidationProvider name="DateEnd" rules="required">
                                                <v-menu ref="menuDateEnd"
                                                        slot-scope="{errors,valid}"
                                                        transition="slide-y-transition"
                                                        :close-on-content-click="false"
                                                        v-model="menuDateEnd"
                                                        left>
                                                    <v-text-field slot="activator"
                                                                  ref="DateEnd"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Fecha de cierre"
                                                                  prepend-icon="event"
                                                                  v-model="Course.dateEnd"
                                                                  readonly
                                                                  required />
                                                    <v-date-picker v-model="Course.dateEnd"
                                                                   header-color="red lighten-2"
                                                                   color="light-blue lighten-2"
                                                                   locale="es-419">
                                                                   <v-spacer></v-spacer>
                                                                   <v-btn flat color="green" @click="$refs.menuDateEnd.save(Course.dateEnd)">Aceptar</v-btn>
                                                    </v-date-picker>
                                            </v-menu>
                                            </ValidationProvider> 
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <ValidationProvider name="HourStart" rules="required">
                                                <v-menu ref="menuHourStart"
                                                        slot-scope="{errors,valid}"
                                                        transition="slide-y-transition"
                                                        :close-on-content-click="false"
                                                        v-model="menuHourStart"
                                                        left>
                                                        <v-text-field slot="activator"
                                                                      v-model="hourStart"
                                                                      :error-messages="errors"
                                                                      :success="valid"
                                                                      label="Hora de inicio"
                                                                      prepend-icon="access_time"
                                                                      readonly
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
                                        <v-flex xs12 md6 lg6>
                                            <ValidationProvider name="HourEnd" rules="required">
                                                <v-menu ref="menuHourEnd"
                                                        slot-scope="{errors,valid}"
                                                        transition="slide-y-transition"
                                                        :close-on-content-click="false"
                                                        v-model="menuHourEnd"
                                                        left>
                                                        <v-text-field slot="activator"
                                                                      v-model="hourEnd"
                                                                      :error-messages="errors"
                                                                      :success="valid"
                                                                      label="Hora de cierre"
                                                                      prepend-icon="access_time"
                                                                      readonly
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
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn outline color="light-blue lighten-2" @click="step=1">Atras</v-btn>
                                    <v-btn outline color="green" :disabled="invalid || !validated" @click="step=3">Siguiente</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </ValidationObserver>
                </v-stepper-content>

                <!-- Formulario 3 -->
                <v-stepper-content step="3">
                    <ValidationObserver ref="obs3">
                        <v-card slot-scope="{invalid, validated}">
                            <v-form>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="courseTo" rules="required">
                                                <v-text-field slot-scope="{errors, valid}"
                                                          v-model="Course.courseTo"
                                                          :error-messages="errors"
                                                          :success="valid"
                                                          label="Dirigido para"
                                                          required />
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="modality" rules="required">
                                                <v-select slot-scope="{errors, valid}"
                                                          :items="['Presencial','Virtual']"
                                                          v-model="Course.modality"
                                                          :error-messages="errors"
                                                          :success="valid"
                                                          label="Modalidad"
                                                          required />
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="typeCourse" rules="required">
                                                <v-select slot-scope="{errors, valid}"
                                                          :items="['Profesional','Docente']"
                                                          v-model="Course.typeCourse"
                                                          :error-messages="errors"
                                                          :success="valid"
                                                          label="Tipo de curso"
                                                          required />
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn outline color="light-blue lighten-2" @click="step=2">Atras</v-btn>
                                    <v-btn outline color="green" :disabled="invalid || !validated || !btnDisableCourse" @click.prevent="send">Enviar</v-btn>
                                    <v-btn outline color="orange" :disabled="btnDisableCourse" @click="newCourse">Nuevo</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </ValidationObserver>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import axios from 'axios';
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
    name:'FormCourses',
    components:{ValidationObserver,ValidationProvider},
    data() {
        return {
            timeout:2500,
            step:1,
            btnDisables:true,
            menuDateStart:false,
            menuDateEnd:false,
            menuHourStart:false,
            menuHourEnd:false,
            hourStart:"",
            hourEnd:"",
            Course:{
                courseName:"",
                teacherRFC:"",
                modality:"",
                dateStart:"",
                dateEnd:"",
                timetable:"",
                place:"",
                typeCourse:"",
                description:"",
                courseTo:"",
                state:""
            }
        }
    },
    computed:{
        ...mapState(['snackbars','btnDisableCourse'])
    },
    methods: {
        //permite escoger horas exactas para los timePickers
        allowedMinutes: v => v < 1 && v <= 11,

        ...mapMutations(['enableButtonNew','showSnackbars']),

        ...mapActions(['saveCourse']),

        send(){
            this.Course.timetable = this.hourStart + "-" + this.hourEnd;
            this.saveCourse(this.Course);
        },
        newCourse(){
            this.step = 1;
            this.clearFields();
            this.showSnackbars({value:true,form:"course",res:"succ"});
            this.enableButtonNew({form:"course",value:false});
        },
        clearFields(){
            this.Course.courseName = "";
            this.Course.teacherRFC = "";
            this.Course.modality = "";
            this.Course.dateStart = "";
            this.Course.dateEnd = "";
            this.Course.timetable = "";
            this.Course.place = "";
            this.Course.description = "";
            this.Course.courseTo = "";
            this.Course.typeCourse= "";
            this.hourStart = "";
            this.hourEnd = "";
            this.$refs.obs1.reset();
            this.$refs.obs2.reset();
            this.$refs.obs3.reset();
        }

    }
    
}
</script>