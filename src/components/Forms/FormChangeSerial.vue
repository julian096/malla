<template>
    <v-container>
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
                                                          prepend-icon="done"
                                                          @keyup.enter.prevent="changePass(pass)"/>
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
                                                          @keyup.enter.prevent="changePass(pass)"/>
                                        </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout row justify-space-around>
                                    <v-btn flat color="green" :disabled="!validated" @click="sendSerial">Aceptar</v-btn>
                                    <v-btn flat color="red" @click="closeChangeSerial">Cancelar</v-btn>
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

export default {
    name: 'FormChangeSerial',
    props:['displayChangeSerial'],
    components:{ValidationObserver, ValidationProvider},
    data() {
        return {
            confirmSerial:"",
            dataSerial:{
                serial:""
            }
        }
    },
    methods:{
        sendSerial(){
            EventBus.$emit('sendSerial',this.dataSerial);
        },

        closeChangeSerial(){
            EventBus.$emit('closeChangeSerial');
            this.confirmSerial = "",
            this.dataSerial.serial = "";
        }
    }
}
</script>