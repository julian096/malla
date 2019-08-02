<template>
    <v-container grid-list-xl text-xs-center>
        <v-snackbar v-model="snackSu" top color="success" class="white--text">Datos actualizados correctamente</v-snackbar>
        <v-snackbar v-model="snackEr" top color="error" class="white--text">{{errorMsg}}</v-snackbar>

        <p class="display-1">Datos del docente</p>
        <!-- datos del docente -->
        <v-card elevation="10" v-if="update == 'No'">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Nombre</p>
                        <span class="subheading">{{Teacher.name}} {{Teacher.fstSurname}} {{Teacher.sndSurname}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">RFC</p>
                        <span class="subheading">{{Teacher.rfc}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Email</p>
                        <span class="subheading">{{Teacher.email}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Numero de teléfono</p>
                        <span class="subheading">{{Teacher.numberPhone}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Horario</p>
                        <span class="subheading">{{Teacher.schedule}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Departamento</p>
                        <span class="subheading">{{Teacher.departament}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Posición dentro del departamento</p>
                        <span class="subheading">{{Teacher.position}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Tipo de usuario</p>
                        <span class="subheading">{{Teacher.userType}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Grado de estudio</p>
                        <span class="subheading">{{Teacher.studyLevel}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Especialidad</p>
                        <span class="subheading">{{Teacher.speciality}}</span>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <p class="headline font-italic">Titulo</p>
                        <span class="subheading">{{Teacher.degree}}</span>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-layout row justify-space-around v-if="!breakpoint.xs">
                    <v-flex xs3>
                        <v-btn outline block color="orange" @click="update = 'Si'">Actualizar</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn dark block color="red" @click="dialog = true">Eliminar</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex xs12>
                        <v-btn outline block color="orange" @click="update = 'Si'">Actualizar</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn dark block color="red" @click="dialog = true">Eliminar</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>

        <!-- Aqui poner el formulario si se selecciona actualizar docente -->
        <v-card elevation="10" v-else>
            <v-form>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs12 sm4>
                            <ValidationProvider name="name" rules="required">
                                <v-text-field v-model="Teacher.name"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Nombres"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <ValidationProvider name="first surname" rules="required">
                                <v-text-field v-model="Teacher.fstSurname"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Primer apellido"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <ValidationProvider name="second surname" rules="required">
                                <v-text-field v-model="Teacher.sndSurname"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Segundo apellido"/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <ValidationProvider name="email" rules="required|email">
                                <v-text-field v-model="Teacher.email"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Correo electrónico"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm3>
                            <ValidationProvider name="number phone" rules="required|numeric|digits:10">
                                <v-text-field v-model="Teacher.numberPhone"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Teléfono"
                                              type="number"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm3>
                            <ValidationProvider name="rfc" rules="required|alpha_num|length:13">
                                <v-text-field v-model="Teacher.rfc"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="RFC"/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md2>
                            <ValidationProvider name="level study" rules="required">
                                <v-select v-model="Teacher.studyLevel"
                                          :items="['Doctorado','Maestría','Licenciatura','Otro']"
                                          slot-scope="{errors, valid}"
                                          :error-messages="errors"
                                          :success="valid"
                                          label="Grado de estudio"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm12 md5>
                            <ValidationProvider name="degree" rules="required">
                                <v-text-field v-model="Teacher.degree"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Titulo"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm12 md5>
                            <ValidationProvider name="speciality" rules="required">
                                <v-text-field v-model="Teacher.speciality"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Especialidad"/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <ValidationProvider name="department" rules="required">
                                <v-select v-model="Teacher.departament"
                                          :items="departments"
                                          slot-scope="{errors, valid}"
                                          :error-messages="errors"
                                          :success="valid"
                                          label="Departamento"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm3>
                            <ValidationProvider name="user type" rules="required">
                                <v-select v-model="Teacher.userType"
                                          :items="userType"
                                          slot-scope="{errors, valid}"
                                          :error-messages="errors"
                                          :success="valid"
                                          label="Tipo de usuario"/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm3 v-if="isBoss">
                            <ValidationProvider name="posición" rules="required">
                                <v-text-field v-model="Teacher.position"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Posición en el departamento"/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6>
                            <ValidationProvider name="hourStart" rules="required">
                            <v-menu ref="menuHourStart"
                            transition="slide-y-transition"
                            slot-scope="{errors, valid}"
                            :close-on-content-click="false"
                            v-model="menuHourStart"
                            left>
                                <v-text-field slot="activator"
                                              v-model="hourStart"
                                              label="Hora de entrada"
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
                        <v-flex xs12 sm6>
                            <ValidationProvider name="hourEnd" rules="required">
                            <v-menu ref="menuHourEnd"
                            transition="slide-y-transition"
                            slot-scope="{errors,valid}"
                            :close-on-content-click="false"
                            v-model="menuHourEnd"
                            left>
                                <v-text-field slot="activator"
                                              v-model="hourEnd"
                                              label="Hora de salida"
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
                </v-card-text>
                <v-card-actions>
                    <v-layout row justify-space-around v-if="!breakpoint.xs">
                        <v-flex xs3>
                            <v-btn outline block color="green" :disabled="buttonDis" @click="upTeacher">Guardar</v-btn>
                        </v-flex>
                        <v-flex xs3>
                            <v-btn outline block color="red" @click="backToDatateacher">Cancelar</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap v-else>
                        <v-flex xs12>
                            <v-btn outline block color="green" :disabled="buttonDis" @click="updateTeacher">Guardar</v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn outline block color="red" @click="backToDatateacher">Cancelar</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-form>
        </v-card>

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
                                <p class="subheading">¿Estas seguro que quieres eliminar este docente?</p>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap>
                            <v-flex>
                                <v-btn outline color="green" @click="deleteTeacher($route.params.docente)">Aceptar</v-btn>
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
import {mapActions} from 'vuex';
import router from '../../router';
import EventBus from '../../bus';

export default {
    name: 'DataTeacher',
    components:{ValidationProvider},
    data() {
        return {
            breakpoint: this.$vuetify.breakpoint,
            snackSu:false,
            snackEr:false,
            errorMsg:"",
            buttonDis:false,
            update:'No',
            dialog:false,
            userType:['Administrador','Jefe de departamento','Comunicación','Docente'],
            departments:['Ciencias Básicas','Desarrollo Académico','Económico-Administrativo','Ingenierías','Ingeniería Industrial','Sistemas y Computación'],
            menuHourStart:false,
            hourStart:"",
            hourEnd:"",
            menuHourEnd:false,
            Teacher:{
                rfc:"",
                name:"",
                fstSurname:"",
                sndSurname:"",
                email:"",
                numberPhone:"",
                schedule:"",
                departament:"",
                speciality:"",
                studyLevel:"",
                userType:"",
                degree:"",
                position:"",
            }
        }
    },
    computed:{
        isBoss(){
            return (this.Teacher.userType == 'Jefe de departamento') ? false : true;
        }
    },
    methods:{
        allowedMinutes: v => v <= 1 && v <= 11,

        ...mapActions(['getDataTeacher','deleteTeacher','updateTeacher']),
        
        backToDatateacher(){
            this.getDataTeacher(this.$route.params.docente);
            this.update = 'No'
        },
        
        //actualiza los datos del docente
        upTeacher(){
            this.Teacher.schedule = this.hourStart + '-' + this.hourEnd;
            if(this.Teacher.userType == 'Jefe de departamento'){
                this.Teacher.position = 'Jefe de departamento';
            }
            this.updateTeacher({rfc:this.$route.params.docente,body:this.Teacher});
        }
    },
    created() {
        this.getDataTeacher(this.$route.params.docente);
    },
    mounted() {

        EventBus.$on('getDataTeacher',response=>{
            this.Teacher.rfc = response.data.rfc;
            this.Teacher.name = response.data.name;
            this.Teacher.fstSurname = response.data.fstSurname;
            this.Teacher.sndSurname = response.data.sndSurname;
            this.Teacher.email = response.data.email;
            this.Teacher.numberPhone = response.data.numberPhone;
            this.Teacher.schedule = response.data.schedule;
            this.Teacher.departament = response.data.departament;
            this.Teacher.speciality = response.data.speciality;
            this.Teacher.studyLevel = response.data.studyLevel;
            this.Teacher.userType = response.data.userType;
            this.Teacher.degree = response.data.degree;
            this.Teacher.position = response.data.position;
            this.hourStart = response.data.schedule.substr(0,5);
            this.hourEnd = response.data.schedule.substr(6);
        });

        EventBus.$on('deleteTeacher',()=>{
            this.dialog = false
            router.push({name:"Docentes"})
        });

        EventBus.$on('suUpdateTeacher',()=>{
            router.push({name: 'Docente', params:{docente: this.Teacher.rfc}});
            this.snackSu = true;
            this.buttonDis = true;
            setTimeout(() => {
                this.snackSu = false;
                this.getDataTeacher(this.$route.params.docente);
                this.update = 'No';
                this.buttonDis = false;
            }, 2000)
        });

        EventBus.$on('erUpdateTeacher',error=>{
            this.errorMsg = error;
            this.snackEr = true;
            setTimeout(() => {
                this.snackEr = false;
            }, 2000);
        })
    }
}
</script>