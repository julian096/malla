<template>
    <v-container>
        <v-snackbar v-model="snackOk" top color="green" class="white--text">Contraseña actualizada correctamente</v-snackbar>
        <v-snackbar v-model="snackEr" top color="error" class="white--text">{{textError}}</v-snackbar>

        <v-dialog v-model="displayChangePass" max-width="330" persistent>
            <ValidationObserver ref="obs">
                <v-card slot-scope="{validated}">
                    <v-toolbar card color="red lighten-2" dark>
                        <v-icon>warning</v-icon>
                        <v-toolbar-title>Cambio de contraseña</v-toolbar-title>
                    </v-toolbar>
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
                                                      @keyup.enter.prevent="send" />
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
                                                      @keyup.enter.prevent="send"/>
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
                                                      @keyup.enter.prevent="send"/>
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-layout row justify-space-around>
                                <v-btn outline color="success" @click.prevent="send" :disabled="!validated || !btnDisableChangePass">Aceptar</v-btn>
                                <v-btn outline color="error" @click="closeChangePass">Cancelar</v-btn>
                                </v-layout>
                        </v-card-actions>
                    </v-form>
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
            textError:"",
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

        async send(){
            const value = await this.changePass(this.pass);
            if(typeof value === 'string'){
                this.textError = value
                this.snackEr = true;
                setTimeout(() => {
                    this.snackEr = false;
                    this.textError = "";
                }, 2000);
            }else if(typeof value === 'boolean'){
                this.snackOk = value;
                setTimeout(()=>{
                    this.snackOk = false;
                    this.closeChangePass();
                },2000);
            }
        },
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