<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <p class="display-1">Datos del membrete {{$route.params.letterheadName}}</p>

        <v-card elevation="10" v-if="update == 'No'">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 sm9>
                        <p class="headline font-italic">Titulo general del membrete</p>
                        <span class="subheading">{{Letterhead.nameDocument}}</span>
                    </v-flex>
                    <v-flex xs12 sm3>
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
                <v-layout row justify-center class="mb-1">
                    <v-btn color="orange" outline @click="update = 'Si'">Actualizar información</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>

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
                            <ValidationProvider name="version">
                                <v-text-field v-model="Letterhead.version"
                                              slot-scope="{errors, valid}"
                                              :error-messages="errors"
                                              :success="valid"
                                              label="Versión"
                                              type="number"
                                              required/>
                            </ValidationProvider>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-layout row justify-space-around class="mb-1">
                    <v-btn color="green" outline @click="dialog = true">Guardar</v-btn>
                    <v-btn color="red" outline @click="update = 'No'">Cancelar</v-btn>
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
                                <v-btn flat color="green" @click="updateLetterhead">Aceptar</v-btn>
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
import Navigation from '@/components/Navbars/Navigation.vue';
import {mapState, mapMutations} from 'vuex';
import axios from 'axios';
import router from '../../router';

export default {
    name: 'DataLetterhead',
    components:{Navigation,ValidationProvider},
    data() {
        return {
            update:'No',
            dialog:false,
            menuEmitDate:false,
            Letterhead:{
                emitDate:"",
                nameDocument:"",
                typeDocument:"",
                version:""
            }
        }
    },
    computed:{
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        // crear la funcion que me obtendra los datos de un solo membrete
        async getDataLetterhead(){
            this.createKeyAuth();
            try {
                const dataLetterhead = await axios.get("http://localhost:5000/metadata/"+this.$route.params.letterheadName,this.keyAuth);
                this.Letterhead.emitDate = dataLetterhead.data.emitDate.replace("T00:00:00+00:00","");;
                this.Letterhead.nameDocument = dataLetterhead.data.nameDocument;
                this.Letterhead.typeDocument = dataLetterhead.data.typeDocument;
                this.Letterhead.version = dataLetterhead.data.version;
            } catch (error) {
                console.error(error);
            }
        },

        // Actualiza la información del membrete
        async updateLetterhead(){
            this.createKeyAuth();
            try {
                await axios.put("http://localhost:5000/metadata/"+this.$route.params.letterheadName,this.Letterhead,this.keyAuth);
                this.update = 'No';
                this.dialog = false;
                router.push({name: 'Membretado'});
            } catch (error) {
                console.error(error);
            }
        }
    },
    created(){
        this.getDataLetterhead();
    }
}
</script>