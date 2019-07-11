<template>
    <v-container text-xs-center grid-list-lg>
        <v-snackbar :value="snackbars.snackbarSuTeacher" :timeout="timeout" top color="gray" class="light-green--text text--accent-3">Usuario registrado con éxito</v-snackbar>
        <v-snackbar :value="snackbars.snackbarErTeacher" :timeout="timeout" top color="red darken-4" class="white--text">Error, verifique correctamente los datos</v-snackbar>

        <v-layout row justify-center>
            <v-flex xs12>
                <p class="headline ml-5">¿El usuario a registrar será interno o externo a la institución?</p>
                <v-radio-group v-model="isInternal" row class="ml-5">
                    <v-radio label="Interno" value="Interno"/>
                    <v-radio label="Externo" value="Externo"/>
                </v-radio-group>
            </v-flex>
        </v-layout>

        <!-- Formulario de asesor externo -->
        <div v-if="!internal">
            <ValidationObserver ref="external">
                <v-card slot-scope="{invalid, validated}">
                    <v-form>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="RFC" rules="required|alpha_num|length:13">
                                    <v-text-field slot-scope="{errors, valid}"
                                                  v-model="TeacherExt.rfc"
                                                  :error-messages="errors"
                                                  :success="valid"
                                                  label="RFC"
                                                  required />
                                </ValidationProvider>
                            </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="name" rules="required|alpha_spaces">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model="TeacherExt.name"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="Nombres"
                                                      required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="first name" rules="required|alpha_spaces">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model="TeacherExt.fstSurname"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="Primer apellido"
                                                      required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="second name" rules="required|alpha_spaces">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model="TeacherExt.sndSurname"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="Segundo apellido"
                                                      required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="email" rules="required|email">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model="TeacherExt.email"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="Correo electrónico"
                                                      required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="number phone" rules="required|numeric|digits:10">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model="TeacherExt.numberPhone"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="Número de teléfono"
                                                      required 
                                                      type="number"/>
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="studyLevel" rules="required">
                                        <v-select slot-scope="{errors, valid}"
                                                  :items="studyLevel"
                                                  v-model="TeacherExt.studyLevel"
                                                  :error-messages="errors"
                                                  :success="valid"
                                                  label="Nivel de estudio"
                                                  required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="degree" rules="required">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model="TeacherExt.degree"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="Titulo"
                                                      required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="speciality" rules="required">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model="TeacherExt.speciality"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="Especialidad"
                                                      required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="pin" rules="required|alpha_dash|min:8">
                                        <v-text-field slot-scope="{errors, valid}"
                                                      v-model.trim="Teacher.pin"
                                                      :error-messages="errors"
                                                      :success="valid"
                                                      label="PIN"
                                                      required />
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn flat color="green" :disabled="invalid || !validated || !btnDisableUserExt"  @click="send">Enviar</v-btn>
                            <v-btn flat color="orange" :disabled="btnDisableUserExt" @click="newUser">Nuevo</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </ValidationObserver>
        </div>

        <v-stepper v-model="step" v-else-if="internal">
            <v-stepper-header>
                <v-stepper-step color="red lighten-2" :complete="step > 1" step="1">Información Personal</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step color="red lighten-2" :complete="step > 2" step="2">Información Profesional</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step color="red lighten-2" step="3">Información Institucional</v-stepper-step>
            </v-stepper-header>

            <div>
                <v-stepper-items >
                    <!-- Formulario 1 -->
                    <v-stepper-content step="1">
                        <ValidationObserver ref="obs1">
                            <v-card slot-scope="{invalid, validated}">
                                <v-form>
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="RFC" rules="required|alpha_num|length:13">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.rfc"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="RFC"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="name" rules="required|alpha_spaces">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.name"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Nombres"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="firstSurname" rules="required|alpha_spaces">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.fstSurname"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Apellido paterno"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="secondSurname" rules="required|alpha_spaces">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.sndSurname"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Apellido materno"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="email" rules="required|email">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.email"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Correo electrónico"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="numberPhone" rules="required|numeric|digits:10">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.numberPhone"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Teléfono"
                                                                  required
                                                                  type="number" />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout row wrap>
                                            <v-btn outline color="green" :disabled="invalid || !validated"     @click="step=2">Siguiente</v-btn>
                                        </v-layout>
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
                                            <v-flex xs12 sm6>
                                                <ValidationProvider name="studyLevel" rules="required">
                                                    <v-select slot-scope="{errors, valid}"
                                                              :items="studyLevel"
                                                              v-model="Teacher.studyLevel"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="Grado de estudio"
                                                              required />
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 v-if="otherOption">
                                                <ValidationProvider name="other" rules="required">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.otherStudyLevel"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Grado de estudio específico"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="degree" rules="required|alpha_spaces">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.degree"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Título"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="speciality" rules="required|alpha_spaces">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model="Teacher.speciality"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Especialidad"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout row justify-space-around>
                                            <v-btn outline color="light-blue lighten-2" @click="step=1">atras</v-btn>
                                            <v-btn outline color="green" :disabled="invalid || !validated"     @click="step=3">Siguiente</v-btn>
                                        </v-layout>
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
                                            <v-flex xs6>
                                                <ValidationProvider name="departments" rules="required">
                                                    <v-select slot-scope="{errors, valid}"
                                                              :items="departments"
                                                              v-model="Teacher.departament"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="Departamento al que pertenece"
                                                              required />
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs6>
                                                <ValidationProvider name="userType" rules="required">
                                                    <v-select slot-scope="{errors, valid}"
                                                              :items="typeUsers"
                                                              v-model="Teacher.userType"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="Tipo de usuario"
                                                              required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap v-if="Teacher.userType != 'Jefe de departamento'">
                                            <v-flex xs12>
                                                <ValidationProvider name="position" rules="required">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                              v-model="Teacher.position"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="Posición dentro del departamento"
                                                              required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12 md6 lg6>
                                                <ValidationProvider name="ScheduleStart" rules="required">
                                                    <v-menu ref="menuScheduleStart"
                                                            slot-scope="{errors,valid}"
                                                            transition="slide-y-transition"
                                                            :close-on-content-click="false"
                                                            v-model="menuScheduleStart"
                                                            left>
                                                            <v-text-field slot="activator"
                                                                          v-model="scheduleStart"
                                                                          :error-messages="errors"
                                                                          :success="valid"
                                                                          label="Hora de entrada"
                                                                          prepend-icon="access_time"
                                                                          readonly
                                                                          required />
                                                            <v-time-picker v-model="scheduleStart"
                                                                           :allowed-minutes="allowedMinutes"
                                                                           header-color="red lighten-2"
                                                                           color="light-blue lighten-2"
                                                                           format="24hr">
                                                                           <v-spacer></v-spacer>
                                                                           <v-btn flat color="green"    @click="$refs.menuScheduleStart.save   (scheduleStart)">Aceptar</v-btn>
                                                            </v-time-picker>
                                                    </v-menu>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 md6 lg6>
                                                <ValidationProvider name="scheduleEnd" rules="required">
                                                    <v-menu ref="menuScheduleEnd"
                                                            slot-scope="{errors,valid}"
                                                            transition="slide-y-transition"
                                                            :close-on-content-click="false"
                                                            v-model="menuScheduleEnd"
                                                            left>
                                                        <v-text-field slot="activator"
                                                                      ref="scheduleEnd"
                                                                      :error-messages="errors"
                                                                      :success="valid"
                                                                      label="Hora de salida"
                                                                      prepend-icon="access_time"
                                                                      v-model="scheduleEnd"
                                                                      readonly
                                                                      required />
                                                        <v-time-picker v-model="scheduleEnd"
                                                                       :allowed-minutes="allowedMinutes"
                                                                       header-color="red lighten-2"
                                                                       color="light-blue lighten-2"
                                                                       format="24hr">
                                                                       <v-spacer></v-spacer>
                                                                       <v-btn flat color="green"    @click="$refs.menuScheduleEnd.save (scheduleEnd)">Aceptar</v-btn>
                                                        </v-time-picker>
                                                </v-menu>
                                                </ValidationProvider> 
                                            </v-flex>
                                        </v-layout>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <ValidationProvider name="pin" rules="required|alpha_dash|min:8">
                                                    <v-text-field slot-scope="{errors, valid}"
                                                                  v-model.trim="Teacher.pin"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="PIN"
                                                                  required />
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-layout row justify-space-around>
                                            <v-btn outline color="light-blue lighten-2" @click="step=2">Atras</v-btn>
                                            <v-btn outline color="green" :disabled="invalid || !validated || !btnDisableUserInt" @click.prevent="send">Enviar</v-btn>
                                            <v-btn outline color="orange" :disabled="btnDisableUserInt"   @click="newUser">Nuevo</v-btn>
                                        </v-layout>
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </ValidationObserver>
                    </v-stepper-content>
                </v-stepper-items>
            </div>
        </v-stepper>
       
    </v-container>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import {mapActions, mapState, mapMutations} from 'vuex';
import axios from 'axios';

export default {
    name:'FormUsers',
    components:{ValidationObserver,ValidationProvider},
    data() {
        return {
            step:1,
            isInternal:"Interno",
            timeout:2500,
            scheduleStart:"",
            menuScheduleStart:false,
            scheduleEnd:"",
            menuScheduleEnd:false,
            studyLevel:['Licenciatura','Maestría','Doctorado','Otro'],
            departments:['Ciencias Básicas','Desarrollo Académico','Económico-Administrativo','Ingenierías','Ingeniería Industrial','Sistemas y Computación'],
            typeUsers:['Administrador','Jefe de departamento','Docente','Comunicación'],
            Teacher:{
                rfc:"",
                name:"",
                fstSurname:"",
                sndSurname:"",
                numberPhone:"",
                email:"",
                studyLevel:"",
                otherStudyLevel:"",
                degree:"",
                speciality:"",
                departament:"",
                schedule:"",
                position:"",
                userType:"",
                pin:"",
                internal:null
            },
            TeacherExt:{
                rfc:"",
                name:"",
                fstSurname:"",
                sndSurname:"",
                numberPhone:"",
                email:"",
                internal:null,
                studyLevel:"",
                degree:"",
                speciality:"",
                userType:"",
                pin:""
            }
        }
    },
    computed: {
        ...mapState(['snackbars','btnDisableUserInt','btnDisableUserExt']),

        //muestra un formulario u otro dependiendo el tipo de usuario
        internal(){
            if(this.isInternal == 'Interno'){
                this.Teacher.internal = true;
                return true;
            }else if(this.isInternal == 'Externo'){
                this.TeacherExt.internal = false;
                return false;
            }
        },

        //muestra un input para otro grado de estudios
        otherOption(){
            return (this.Teacher.studyLevel == 'Otro') ? true : false;
        }
    },
    methods: {
        allowedMinutes: v => v < 1 && v <= 11,

        ...mapMutations(['enableButtonNew']),

        ...mapActions(['saveUser']),

        //Este metodo ejecuta una accion que registra el docente
        send(){
            this.Teacher.schedule = this.scheduleStart + '-' + this.scheduleEnd;

            if(this.Teacher.userType == 'Jefe de departamento'){
                this.Teacher.position = 'Jefe de departamento';
            }

            if(this.isInternal=="Interno"){
                //Aqui ejecuta la accion de guardar el usuario
                this.saveUser(this.Teacher);
            }else if(this.isInternal=="Externo"){
                this.TeacherExt.userType = 'Docente';
                this.saveUser(this.TeacherExt);
            }
        },

        //limpia los campos de ambos formularios
        newUser(){
            if(this.Teacher.internal){
                this.clearFieldsInternal();
            }else{
                this.clearFieldsExternal();
            }
            this.step = 1;
            this.enableButtonNew({form:"teacher",value:false});
        },
        clearFieldsExternal(){
            this.Teacher.rfc = "";
            this.Teacher.name = "";
            this.Teacher.fstSurname = "";
            this.Teacher.sndSurname = "";
            this.Teacher.email = "";
            this.Teacher.numberPhone = "";
            this.Teacher.studyLevel = "";
            this.Teacher.degree = "";
            this.Teacher.speciality = "";
            this.$refs.external.reset();
        },
        clearFieldsInternal(){
            this.Teacher.rfc = "";
            this.Teacher.name = "";
            this.Teacher.fstSurname = "";
            this.Teacher.sndSurname = "";
            this.Teacher.email = "";
            this.Teacher.numberPhone = "";
            this.Teacher.studyLevel = "";
            this.Teacher.speciality = "";
            this.Teacher.degree = "";
            this.Teacher.position = "";
            this.Teacher.schedule = "";
            this.Teacher.departament = "";
            this.Teacher.userType = "";
            this.Teacher.pin = "";
            this.isBoss = null;
            this.scheduleStart = "";
            this.scheduleEnd = "";
            this.menuScheduleStart = false;
            this.menuScheduleEnd = false;
            this.$refs.obs1.reset();
            this.$refs.obs2.reset();
            this.$refs.obs3.reset();
        }
    }
}
</script>