<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation />
        
        <span class="display-2">Mi perfil</span>
        <v-card elevation="20" class="mt-3">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md6>
                        <p class="headline font-italic">Nombre</p>
                        <span class="subheading">{{Teacher.name}} {{Teacher.fstSurname}} {{Teacher.sndSurname}}</span>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <p class="headline font-italic">RFC</p>
                        <span class="subheading">{{Teacher.rfc}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Email</p>
                        <span class="subheading">{{Teacher.email}}</span>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Numero de teléfono</p>
                        <span class="subheading">{{Teacher.numberPhone}}</span>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Horario</p>
                        <span class="subheading">{{Teacher.schedule}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Departamento</p>
                        <span class="subheading">{{Teacher.departament}}</span>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Posición en el departamento</p>
                        <span class="subheading">{{Teacher.position}}</span>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Tipo de usuario</p>
                        <span class="subheading">{{Teacher.userType}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Grado de estudio</p>
                        <span class="subheading">{{Teacher.studyLevel}}</span>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Especialidad</p>
                        <span class="subheading">{{Teacher.speciality}}</span>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                        <p class="headline font-italic mt-4">Titulo</p>
                        <span class="subheading">{{Teacher.degree}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center class="mt-3">
                    <v-btn outline color="orange" @click="openChangePass">Actualizar contraseña</v-btn>
                </v-layout>
            </v-card-text>
        </v-card>

        <FormChangePass :displayChangePass="visible"/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import FormChangePass from '@/components/Forms/FormChangePass.vue';
import {mapState,mapActions, mapMutations} from 'vuex';
import axios from 'axios';
import EventBus from '@/bus.js';

export default {
    name: 'Profile',
    components:{Navigation,FormChangePass},
    data() {
        return {
            visible:null,
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
        ...mapState(['keyAuth','userLoged'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        openChangePass(){
            this.visible = true;
        },

        async getDataTeacher(){
            this.createKeyAuth();
            await axios.get("http://localhost:5000/teacher/"+this.userLoged.rfc,this.keyAuth)
            .then(response => {
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
            })
            .catch(error => {
                console.error(error);
            })
        },
    },
    mounted(){
        this.getDataTeacher();

        EventBus.$on('closeChangePass', () => {
            this.visible = false;
        })
    },
}
</script>