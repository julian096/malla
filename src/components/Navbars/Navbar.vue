<template>
    <div>
        <!-- Navbar antes del login -->
        <v-toolbar dark color="red lighten-2" app>
            <img contain src="../../assets/logotec.png" style="height: 50px">
            <v-toolbar-title>Malla Docente</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn flat @click="openForm">
                    <v-icon left>account_circle</v-icon>
                    Iniciar sesión
                </v-btn>
            </v-toolbar-items>
            <v-menu left transition="slide-y-transition" class="hidden-sm-and-up">
                <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon>account_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-content @click="openForm">Iniciar sesión</v-list-tile-content>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>

        <FormLogin :displayLogin="visible"/>
    </div>
</template>

<script>
import FormLogin from '@/components/Forms/FormLogin.vue'
import EventBus from '@/bus.js';

export default {
    name: 'Navbar',
    props:['showtype'],
    components:{FormLogin},
    data() {
        return {
            visible:null
        }
    },
    methods:{
        openForm(){
            this.visible = true;
        },
    },
    mounted() {
        // Cacho el evento para cerrar el login
        EventBus.$on('closeLogin', () => {
            this.visible = false;
        });
    },
}
</script>