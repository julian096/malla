<template>
    <v-container>
        <v-snackbar v-model="showAlert" top color="success" class="white--text">Limite de dias establecido correctamente</v-snackbar>
        <v-dialog v-model="showDialog" max-width="330" persistent>
            <v-card>
                <v-toolbar card color="yellow darken-2" dark>
                    <v-icon>info_outline</v-icon>
                    <v-toolbar-title>Establezca un límite</v-toolbar-title>
                </v-toolbar>
                <v-container text-xs-center>
                    <v-form>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="limit days" rules="required">
                                        <v-select v-model="dataLimitDays.days"
                                                  slot-scope="{errors,valid}"
                                                  :error-messages="errors"
                                                  :success="valid"
                                                  label="Limite de dias"
                                                  :items="items"/>
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-layout row justify-space-around>
                                <v-btn outline color="green" :disabled="btnDisable" @click="establishLimitDays">Aceptar</v-btn>
                                <v-btn outline color="red" @click="closeLimitDays">Cancelar</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import {ValidationProvider} from 'vee-validate';
import axios from 'axios';
import { mapState } from 'vuex';
import EventBus from '../../bus';

export default {
    name: 'FormLimitDays',
    props:['showDialog'],
    components:{ValidationProvider},
    data() {
        return {
            showAlert:false,
            btnDisable:false,
            items:[],
            dataLimitDays:{
                days: 1
            }
        }
    },
    computed:{
        ...mapState(['keyAuth'])
    },
    methods:{

        // Establece el límite de dias para la encuesta
        async establishLimitDays(){
            try {
                axios.put(`/establishLimitDaysOfPoll`, this.dataLimitDays, this.keyAuth);
                this.btnDisable = true;
                this.showAlert = true;
                setTimeout(()=>{
                    this.closeLimitDays();
                    this.showAlert = false;
                    this.btnDisable = false;
                },2000);
            } catch (error) {
            }
        },

        // Cierra el dialog
        closeLimitDays(){
            EventBus.$emit('closeLimitDays');
            this.dataLimitDays.days = 1;
        }
    },
    created() {
        for(let i=1; i<31; i++){
            this.items.push(i);
        }
    }
}
</script>