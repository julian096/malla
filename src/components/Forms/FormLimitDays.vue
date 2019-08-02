<template>
    <v-container>
        <v-snackbar v-model="showAlert" top color="success" class="white--text">Limite de dias establecido correctamente</v-snackbar>
        <v-dialog v-model="showDialog" max-width="330" persistent>
            <ValidationObserver ref="obs">
                <v-card slot-scope="{validated}">
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
                                    <v-btn outline color="green" :disabled="!validated" @click="establishLimitDaysOfPoll(dataLimitDays)">Aceptar</v-btn>
                                    <v-btn outline color="red" @click="closeLimitDays">Cancelar</v-btn>
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
import { mapActions } from 'vuex';

export default {
    name: 'FormLimitDays',
    props:['showDialog'],
    components:{ValidationObserver, ValidationProvider},
    data() {
        return {
            showAlert:false,
            items:[],
            dataLimitDays:{
                days: 1
            }
        }
    },
    methods:{
        ...mapActions(['establishLimitDaysOfPoll']),

        closeLimitDays(){
            EventBus.$emit('closeLimitDays');
            this.dataLimitDays.days = 1;
        }
    },
    created() {
        for(let i=1; i<31; i++){
            this.items.push(i);
        }
    },
    mounted() {
        EventBus.$on('suEstablishLimitDaysOfPoll',()=>{
            this.showAlert = true;
            setTimeout(()=>{
                this.closeLimitDays();
                this.showAlert = false;
            },2000);
        });
    },
}
</script>