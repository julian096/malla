<template>
    <v-container>
        <v-snackbar v-model="snackOk" :timeout="timeout" top color="light-green--text text--accent-3" class="white--text">Contraseña actualizada correctamente</v-snackbar>
        <v-snackbar v-model="snackEr" :timeout="timeout" top color="red darken-4" class="white--text">Contraseña incorrecta</v-snackbar>

        <v-dialog v-model="displayChangePass" max-width="330" persistent>
            <ValidationObserver ref="obs">
                <v-card slot-scope="{validated}">
                    <v-toolbar card color="red lighten-2" dark>
                        <v-icon>warning</v-icon>
                        <v-toolbar-title>Cambio de contraseña</v-toolbar-title>
                    </v-toolbar>
                    <v-container text-xs-center>
                        <v-form>
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <ValidationProvider name="old pass" rules="required|alpha_dash|min:8">
                                            <v-text-field slot-scope="{errors, valid}"
                                                          :error-messages="errors"
                                                          :success="valid"
                                                          v-model="pass.pin"
                                                          label="Antigua contraseña"
                                                          prepend-icon="lock_open"
                                                          autofocus
                                                          type="password"
                                                          @keyup.enter.prevent="changePass(pass)" />
                                        </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <ValidationProvider rules="required|min:8">
                                            <v-text-field slot-scope="{valid}"
                                                          name="newPass"
                                                          ref="newPass"
                                                          :error-messages="errors.collect('newPass')"
                                                          :success="valid"
                                                          v-validate="'min:8|alpha_dash'"
                                                          v-model="pass.newPin"
                                                          label="Nueva contraseña"
                                                          prepend-icon="lock_outline"
                                                          type="password"
                                                          @keyup.enter.prevent="changePass(pass)"/>
                                        </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <ValidationProvider rules="required|confirmed:newPass">
                                            <v-text-field slot-scope="{valid}"
                                                          name="confirmPass"
                                                          target="newPass"
                                                          data-vv-as="newPass"
                                                          :error-messages="errors.collect('confirmPass')"
                                                          :success="valid"
                                                          v-validate="'min:8|confirmed:newPass'"
                                                          v-model="newPin"
                                                          label="Confirme nueva contraseña"
                                                          prepend-icon="lock_outline"
                                                          type="password"
                                                          @keyup.enter.prevent="changePass(pass)"/>
                                        </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout row justify-space-around>
                                    <v-btn flat color="success" @click.prevent="changePass(pass)" :disabled="!validated || !btnDisableChangePass">Aceptar</v-btn>
                                    <v-btn flat color="error" @click="closeChangePass">Cancelar</v-btn>
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
import {mapState,mapMutations,mapActions} from 'vuex';
import EventBus from '@/bus.js';
import {ValidationObserver, ValidationProvider} from 'vee-validate';

export default {
    name: 'FormChangePass',
    props:['displayChangePass'],
    components:{ValidationObserver,ValidationProvider},
    data() {
        return {
            snackOk:false,
            snackEr:false,
            timeout:2500,
            newPin:"",
            pass:{
                pin:"",
                newPin:""
            }
        }
    },
    computed:{
        ...mapState(['btnDisableChangePass'])
    },
    methods:{
        ...mapMutations(['enableButtonNew']),

        ...mapActions(['changePass']),

        closeChangePass(){
            EventBus.$emit('closeChangePass');
            this.pass.pin = "";
            this.pass.newPin = "";
            this.newPin = "";
            this.$refs.obs.reset();
            this.enableButtonNew({form:"pass",value:false});
        }
    },
    created() {
        this.enableButtonNew({form:"pass",value:false});
    },
}
</script>