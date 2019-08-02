<template>
    <v-container>
        <v-snackbar v-model="snackSu" top color="success" class="white--text">Folio actualizado correctamente</v-snackbar>

        <v-dialog v-model="displayChangeSerial" max-width="330" persistent>
            <ValidationObserver ref="obs">
                <v-card slot-scope="{validated}">
                    <v-toolbar card color="red lighten-2" dark>
                        <v-icon>warning</v-icon>
                        <v-toolbar-title>Cambio de folio</v-toolbar-title>
                    </v-toolbar>

                    <v-container text-xs-center>
                        <v-form>
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <ValidationProvider rules="required|length:10">
                                            <v-text-field slot-scope="{valid}"
                                                          name="folio"
                                                          ref="serial"
                                                          :error-messages="errors.collect('folio')"
                                                          :success="valid"
                                                          v-validate="'length:10|alpha_num'"
                                                          v-model="dataSerial.serial"
                                                          label="Folio"
                                                          prepend-icon="done"/>
                                        </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <ValidationProvider rules="required|confirmed:serial">
                                            <v-text-field slot-scope="{valid}"
                                                          name="confirm folio"
                                                          target="serial"
                                                          data-vv-as="folio"
                                                          :error-messages="errors.collect('confirm folio')"
                                                          :success="valid"
                                                          v-validate="'length:10|confirmed:serial'"
                                                          v-model="confirmSerial"
                                                          label="Confirme folio"
                                                          prepend-icon="done_all"
                                                          @keyup.enter.prevent="sendSerial"/>
                                        </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout row justify-space-around>
                                    <v-btn outline color="green" :disabled="!validated || buttonDis" @click="sendSerial">Aceptar</v-btn>
                                    <v-btn outline color="red" @click="closeChangeSerial">Cancelar</v-btn>
                                </v-layout>
                            </v-card-actions>
                        </v-form>
                    </v-container>
                </v-card>
            </ValidationObserver>
        </v-dialog>
    </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider} from 'vee-validate';
import EventBus from '@/bus.js';
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'FormChangeSerial',
    props:['displayChangeSerial'],
    components:{ValidationObserver, ValidationProvider},
    data() {
        return {
            snackSu:false,
            buttonDis:false,
            confirmSerial:"",
            dataSerial:{
                serial:""
            }
        }
    },
    computed: {
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        async sendSerial(){
            try {
                await axios.put("/editSerial/"+this.$route.params.cursoFolio,this.dataSerial,this.keyAuth);
                EventBus.$emit('sendSerial',this.dataSerial.serial);
                this.snackSu = true;
                this.buttonDis = true;
                setTimeout(() => {
                    this.snackSu = false;
                    this.closeChangeSerial();
                    this.buttonDis = false;
                }, 2000);
            } catch (error) {
                console.error(error.response);
            }
        },

        closeChangeSerial(){
            EventBus.$emit('closeChangeSerial');
            this.confirmSerial = "",
            this.dataSerial.serial = "";
            this.$refs.obs.reset();
        }
    },
    created(){
        this.createKeyAuth()
    }
}
</script>