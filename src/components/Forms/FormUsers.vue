<template>
    <v-container text-xs-center grid-list-lg>
        <v-snackbar v-model="snackSu" top color="success" class="white--text">Usuario registrado con éxito</v-snackbar>
        <v-snackbar v-model="snackSuExt" top color="success" class="white--text">Docente externo registrado con éxito</v-snackbar> 
        <v-snackbar v-model="snackEr" top color="error" class="white--text">{{textError}}</v-snackbar>

        <v-expansion-panel popout>
            <!-- Formulario de interno -->
            <v-expansion-panel-content ripple>
                <template v-slot:header>
                    <span class="subheading">Formulario para docente interno</span>
                </template>
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-step color="red lighten-2" :complete="step > 1" step="1">Información Personal</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step color="red lighten-2" :complete="step > 2" step="2">Información Profesional</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step color="red lighten-2" step="3">Información Institucional</v-stepper-step>
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
                                                    <ValidationProvider name="CURP" rules="required|alpha_num|length:18">
                                                        <v-text-field slot-scope="{errors, valid}"
                                                                      v-model="Teacher.curp"
                                                                      :error-messages="errors"
                                                                      :success="valid"
                                                                      label="RFC"
                                                                      required/>
                                                    </ValidationProvider>
                                                </v-flex>
                                            </v-layout>
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
                                                <v-flex xs12 sm3>
                                                    <v-btn outline block color="green" :disabled="invalid || !validated" @click="step=2">Siguiente</v-btn>
                                                </v-flex>
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
                                            <v-layout row wrap>
                                                <v-flex xs12 sm3>
                                                    <v-btn outline block color="light-blue lighten-2" @click="step=1">atras</v-btn>
                                                </v-flex>
                                                <v-flex xs12 sm3>
                                                    <v-btn outline block color="green" :disabled="invalid || !validated" @click="step=3">Siguiente</v-btn>
                                                </v-flex>
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
                                                <v-flex xs12 sm6>
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
                                                <v-flex xs12 sm6>
                                                    <ValidationProvider name="departments" rules="required" v-if="Teacher.userType != 'Comunicación'">
                                                    <v-select slot-scope="{errors, valid}"
                                                              :items="departments"
                                                              v-model="Teacher.departament"
                                                              :error-messages="errors"
                                                              :success="valid"
                                                              label="Departamento al que pertenece"
                                                              required />
                                                    </ValidationProvider>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout row wrap v-if="Teacher.userType != 'Jefe de departamento' && Teacher.userType != 'Comunicación'">
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
                                            <v-layout row wrap v-if="breakpoint.xs">
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
                                                                           <v-btn flat color="green"    @click="$refs.menuScheduleStart.save(scheduleStart)">Aceptar</v-btn>
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
                                                                            <v-btn flat color="green"    @click="$refs.menuScheduleEnd.save(scheduleEnd)">Aceptar</v-btn>
                                                            </v-time-picker>
                                                        </v-menu>
                                                    </ValidationProvider> 
                                                </v-flex>
                                            </v-layout>
                                            <v-layout row wrap v-else>
                                                <v-flex xs12 sm6>
                                                    <ValidationProvider name="hora de entrada" rules="required">
                                                        <v-select slot-scope="{errors, valid}"
                                                                  v-model.trim="scheduleStart"
                                                                  :items="itemsScheduleStart"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Hora de entrada"
                                                                  required />
                                                    </ValidationProvider>
                                                </v-flex>
                                                <v-flex xs12 sm6>
                                                    <ValidationProvider name="hora de salida" rules="required">
                                                        <v-select slot-scope="{errors, valid}"
                                                                  v-model="scheduleEnd"
                                                                  :items="itemsScheduleEnd"
                                                                  :error-messages="errors"
                                                                  :success="valid"
                                                                  label="Hora de salida"
                                                                  required />
                                                    </ValidationProvider>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout row wrap>
                                                <v-flex xs12>
                                                    <ValidationProvider name="pin" rules="required|alpha_dash|min:8">
                                                        <v-text-field slot-scope="{errors, valid}"
                                                                      v-model="Teacher.pin"
                                                                      :error-messages="errors"
                                                                      :success="valid"
                                                                      label="PIN"
                                                                      type="password"
                                                                      required />
                                                    </ValidationProvider>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm4>
                                                    <v-btn outline block color="light-blue lighten-2" @click="step=2" :disabled="!buttonDis">Atras</v-btn>
                                                </v-flex>
                                                <v-flex xs12 sm4>
                                                    <v-btn outline block color="green" :disabled="invalid || !validated || !buttonDis" @click.prevent="sendInt">Enviar</v-btn>
                                                </v-flex>
                                                <v-flex xs12 sm4>
                                                    <v-btn outline block color="orange" :disabled="buttonDis" @click="newUser">Nuevo</v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </ValidationObserver>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-expansion-panel-content>

            <!-- Formulario de externo -->
            <v-expansion-panel-content ripple>
                <template v-slot:header>
                    <span class="subheading">Formulario para docente externo</span>
                </template>
                <v-stepper v-model="stepExt">
                    <v-stepper-header>
                        <v-stepper-step color="red lighten-2" :complete="stepExt > 1" step="1">Información Personal</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step color="red lighten-2" step="2">Información Profesional</v-stepper-step>
                        <v-divider></v-divider>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <ValidationObserver ref="ext1">
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
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm3>
                                                    <v-btn outline block color="green" :disabled="invalid || !validated" @click="stepExt=2">Siguiente</v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </ValidationObserver>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <ValidationObserver ref="ext2">
                                <v-card slot-scope="{invalid, validated}">
                                    <v-form>
                                        <v-card-text>
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
                                                                      v-model.trim="TeacherExt.pin"
                                                                      :error-messages="errors"
                                                                      :success="valid"
                                                                      label="PIN"
                                                                      required />
                                                    </ValidationProvider>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm4>
                                                    <v-btn outline block color="light-blue lighten-2" @click="stepExt=1" :disabled="!buttonDis">Atras</v-btn>
                                                </v-flex>
                                                <v-flex xs12 sm4>
                                                    <v-btn outline block color="green" :disabled="invalid || !validated || !buttonDis" @click.prevent="sendExt">Enviar</v-btn>
                                                </v-flex>
                                                <v-flex xs12 sm4>
                                                    <v-btn outline block color="orange" :disabled="buttonDis" @click="newUser">Nuevo</v-btn>
                                                </v-flex>
                                            </v-layout> 
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </ValidationObserver>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-expansion-panel-content>
        </v-expansion-panel>

    </v-container>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import {mapActions} from 'vuex';
import axios from 'axios';

export default {
    name:'FormUsers',
    components:{ValidationObserver,ValidationProvider},
    data() {
        return {
            snackSu:false,
            snackSuExt:false,
            snackEr:false,
            textError:"",
            buttonDis: true,
            step:1,
            stepExt:1,
            scheduleStart:"",
            menuScheduleStart:false,
            scheduleEnd:"",
            menuScheduleEnd:false,
            studyLevel:['Licenciatura','Maestría','Doctorado','Otro'],
            departments:['Ciencias Básicas','Desarrollo Académico','Económico-Administrativo','Ingenierías','Ingeniería Industrial','Sistemas y Computación'],
            typeUsers:['Administrador','Jefe de departamento','Comunicación','Docente'],
            itemsScheduleStart:[],
            itemsScheduleEnd:[],
            breakpoint: this.$vuetify.breakpoint,
            Teacher:{
                curp:"",
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
                internal:true
            },
            TeacherExt:{
                rfc:"",
                name:"",
                fstSurname:"",
                sndSurname:"",
                numberPhone:"",
                email:"",
                internal:false,
                studyLevel:"",
                degree:"",
                speciality:"",
                userType:"",
                pin:""
            }
        }
    },
    computed: {

        //muestra un input para otro grado de estudios
        otherOption(){
            return (this.Teacher.studyLevel == 'Otro') ? true : false;
        }
    },
    methods: {
        allowedMinutes: v => v < 1 && v <= 11,

        ...mapActions(['saveUser']),

        //Este metodo ejecuta una accion que registra el docente interno
        async sendInt(){
            this.Teacher.schedule = this.scheduleStart + '-' + this.scheduleEnd;

            if(this.Teacher.userType === 'Jefe de departamento'){
                this.Teacher.position = 'Jefe de departamento';
            }
            const valueInt = await this.saveUser(this.Teacher);
            if(typeof valueInt === 'boolean'){
                this.snackSu = true;
                this.buttonDis = false;
                setTimeout(() => {
                    this.snackSu = false;
                }, 2000);
            }else if(typeof valueInt === 'string'){
                this.textError = valueInt
                this.snackEr = true;
                setTimeout(()=>{
                    this.snackEr = false;
                },2000)
            }
        },

        //Este metodo ejecuta una accion que registra el docente externo
        async sendExt(){
            this.TeacherExt.userType = 'Docente';
            const valueExt = await this.saveUser(this.TeacherExt);
            if(typeof valueExt === 'boolean'){
                this.snackSuExt = true;
                this.buttonDis = false;
                setTimeout(() => {
                    this.snackSuExt = false;
                }, 2000);
            }else if(typeof valueExt === 'string'){
                this.textError = valueExt
                this.snackEr = true;
                setTimeout(()=>{
                    this.snackEr = false;
                },2000)
            }
        },

        //limpia los campos de ambos formularios
        newUser(){
            this.clearFieldsInternal();
            this.clearFieldsExternal();
            this.step = 1;
            this.stepExt = 1;
            this.buttonDis = true;
        },
        clearFieldsExternal(){
            this.TeacherExt.rfc = "";
            this.TeacherExt.name = "";
            this.TeacherExt.fstSurname = "";
            this.TeacherExt.sndSurname = "";
            this.TeacherExt.email = "";
            this.TeacherExt.numberPhone = "";
            this.TeacherExt.studyLevel = "";
            this.TeacherExt.degree = "";
            this.TeacherExt.speciality = "";
            this.TeacherExt.pin = "";
            this.$refs.ext1.reset();
            this.$refs.ext2.reset();
        },
        clearFieldsInternal(){
            this.Teacher.curp = "";
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
    },
    created() {
        // Llena el select de la hora de entrada
        let valueItem="";
        for(let i=7; i<13; i++){
            valueItem = "0"+i+":00";
            this.itemsScheduleStart.push(valueItem);
        }
        // console.log(this.itemsScheduleStart);
        let newData = this.itemsScheduleStart.slice(3);
        this.itemsScheduleStart.splice(3,3);
        for(let j of newData){
            this.itemsScheduleStart.push(j.substring(1));
        }

        // Llena el select de la hora de salida
        let valueItems2="";
        for(let k=15; k<21; k++){
            valueItems2 = k+":00";
            this.itemsScheduleEnd.push(valueItems2);
        }
    },
}
</script>