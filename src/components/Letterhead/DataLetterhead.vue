<template>
    <v-container grid-list-lg text-xs-center>

        <v-snackbar v-model="snackSu" top color="success" class="white--text">Datos actualizados correctamente</v-snackbar>
        <p class="display-1">Datos del membrete {{$route.params.letterheadName}}</p>

        <!-- Form para ver los datos del membrete -->
        <v-card elevation="10" v-if="update == 'No'">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Titulo general del membrete</p>
                        <span class="subheading">{{Letterhead.nameDocument}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Versión</p>
                        <span class="subheading">{{Letterhead.version}}</span>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Tipo del membrete</p>
                        <span class="subheading">{{Letterhead.typeDocument}}</span>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <p class="headline font-italic">Fecha de emisión</p>
                        <span class="subheading">{{Letterhead.emitDate}}</span>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-layout row justify-space-around v-if="!breakpoint.xs">
                    <v-flex xs3>
                        <v-btn outline block color="orange" @click="update = 'Si'">Actualizar</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn outline block color="indigo" :to="{name: 'Membretados'}">Atras</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex xs12>
                        <v-btn outline block color="orange" @click="update = 'Si'">Actualizar</v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-btn outline block color="indigo" :to="{name: 'Membretados'}">Atras</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
        </v-card>

        <!-- Form para actualizar los datos -->
        <v-card elevation="10" v-else>
            <v-card-text>
                <v-form>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <ValidationProvider name="title" rules="required">
                                <v-text-field v-model="Letterhead.nameDocument"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Titulo general del documento"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm4>
                            <ValidationProvider name="type" rules="required">
                                <v-text-field v-model="Letterhead.typeDocument"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Tipo de documento"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <ValidationProvider name="emit date" rules="required">
                                <v-menu ref="menuEmitDate"
                                        slot-scope="{errors, valid}"
                                        transition="slide-y-transition"
                                        :close-on-content-click="false"
                                        v-model="menuEmitDate"
                                        left>
                                    <v-text-field slot="activator"
                                                  v-model="Letterhead.emitDate"
                                                  :error-messages="errors"
                                                  :success="valid"
                                                  label="Fecha de emisión"
                                                  prepend-icon="event"
                                                  required />
                                    <v-date-picker v-model="Letterhead.emitDate"
                                                   header-color="red lighten-2"
                                                   color="light-blue lighten-2"
                                                   locale="es-419">
                                                   <v-spacer></v-spacer>
                                                   <v-btn flat color="green" @click="$refs.menuEmitDate.save(Letterhead.emitDate)">Aceptar</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </ValidationProvider>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <ValidationProvider name="version" rules="required">
                                <v-text-field v-model="Letterhead.version"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Versión"
                                              type="number"
                                              min="0"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-layout row justify-space-around class="mb-1" v-if="!breakpoint.xs">
                    <v-flex xs3>
                        <v-btn color="green" block outline @click="dialog = true">Guardar</v-btn>
                    </v-flex>
                    <v-flex xs3>
                        <v-btn color="red" block outline @click="backDataLetterhead">Cancelar</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap class="mb-1" v-else>
                    <v-flex xs12 sm3>
                        <v-btn color="green" block outline @click="dialog = true">Guardar</v-btn>
                    </v-flex>
                    <v-flex xs12 sm3>
                        <v-btn color="red" block outline @click="backDataLetterhead">Cancelar</v-btn>
                    </v-flex>
                </v-layout>
            </v-card-actions>
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
                                <span class="subheading">¿Estas seguro que quieres actualizar la información del membrete?</span>
                            </v-flex>
                            <v-flex class="mt-4">
                                <v-btn outline color="green" :disabled="buttonDis" @click="updateLetterhead">Aceptar</v-btn>
                                <v-btn outline color="red" @click="dialog = false">Cancelar</v-btn>
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
import {mapActions, mapState, mapMutations} from 'vuex';
import router from '../../router';
import axios from 'axios';

export default {
    name: 'DataLetterhead',
    components:{ValidationProvider},
    data() {
        return {
            breakpoint:this.$vuetify.breakpoint,
            snackSu:false,
            buttonDis:false,
            update:'No',
            dialog:false,
            menuEmitDate:false,
            Letterhead:{
                emitDate:"",
                nameDocument:"",
                typeDocument:"",
                version:"",
                shortName:""
            }
        }
    },
    computed: {
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        // obtiene los datos del membrete
        async getLetterhead(){
            this.createKeyAuth();
            try {
                const dataLetterhead = await axios.get(`/metadata/${this.$route.params.letterheadName}`,this.keyAuth);
                this.Letterhead.emitDate = dataLetterhead.data.emitDate.replace("T00:00:00+00:00","");
                this.Letterhead.nameDocument = dataLetterhead.data.nameDocument;
                this.Letterhead.typeDocument = dataLetterhead.data.typeDocument;
                this.Letterhead.version = dataLetterhead.data.version;
                this.Letterhead.shortName = dataLetterhead.data.shortName;
            } catch (error) {
            }
        },
        
        // Actualiza la información del membrete
        async updateLetterhead(){
            try {
                await axios.put(`/metadata/${this.$route.params.letterheadName}`,this.Letterhead,this.keyAuth);
                this.snackSu = true;
                this.buttonDis = true;
                setTimeout(() => {
                    this.snackSu = false;
                    this.update = 'No';
                    this.dialog = false;
                    this.buttonDis = false;
                }, 2000);
            } catch (error) {
                
            }
        },

        // Regresa a los datos del curso
        backDataLetterhead(){
            this.getLetterhead();
            this.update = 'No';
        }, 
    },
    created(){
        this.getLetterhead();
    }
}
</script>