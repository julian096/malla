<template>
    <div>
        <v-snackbar :value="snackbars.snackbarErLogin" :timeout="timeout" top color="red darken-4" class="white--text">Ocurrió un problema al iniciar sesión</v-snackbar>
        <v-dialog v-model="displayLogin" max-width="330" persistent>
            <ValidationObserver ref="obs">
                <v-card slot-scope="{invalid, validated}">
                    <v-container>
                        <v-form>
                            <v-layout row justify-center>
                                <span class="display-1">Inicio de sesión</span>
                            </v-layout>
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <ValidationProvider name="RFC" rules="required|alpha_num|length:13">
                                            <v-text-field slot-scope="{errors, valid}"
                                                          v-model="user.rfc"
                                                          :error-messages="errors"
                                                          :success="valid"
                                                          label="Ingrese su RFC"
                                                          prepend-icon="account_circle"
                                                          autofocus
                                                          @keyup.enter.prevent="login(user)" />
                                        </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <ValidationProvider name="password" rules="required|alpha_dash|min:8">
                                            <v-text-field slot-scope="{errors, valid}"
                                                          v-model="user.pin" 
                                                          :error-messages="errors"
                                                          :success="valid"
                                                          label="Ingrese su contraseña"
                                                          prepend-icon="lock"
                                                          type="password"
                                                          @keyup.enter.prevent="login(user)"/>
                                            </ValidationProvider>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                            <v-card-actions>
                                <v-layout row justify-space-around>
                                    <v-btn outline color="success" @click.prevent="login(user)" :disabled="invalid || !validated">Aceptar</v-btn>
                                    <v-btn outline color="error" @click="closeLogin">Cancelar</v-btn>
                                </v-layout>
                            </v-card-actions>
                        </v-form>
                    </v-container>
                </v-card>
            </ValidationObserver>
        </v-dialog>
    </div>
</template>

<script>
import {ValidationObserver,ValidationProvider} from 'vee-validate';
import EventBus from '@/bus.js';
import axios from 'axios';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'FormLogin',
    components:{ValidationObserver,ValidationProvider},
    props:['displayLogin'],
    data() {
        return {
            user:{
                rfc:"",
                pin:"spartan96"
            },
            timeout:2500
        }
    },
    computed:{
        ...mapState(['snackbars']),
    },
    methods: {
        ...mapActions(['login']),
        // Envio evento al Navbar para cerrar el login
        closeLogin(){
            EventBus.$emit('closeLogin');
            this.user.rfc = "";
            this.user.pin = "";
            this.$refs.obs.reset();
        }
    }
}
</script>