<template>
    <v-container text-xs-center grid-list-lg>
        <Navigation/>
        <p class="display-1">Datos del membretado</p>

        <v-card elevation="10">
            <v-card-text>
                <v-layout row wrap>
                        <v-flex xs12 md6>
                            <p class="headline font-italic">Nombre del documento</p>
                            <span class="subheading">Encuesta para solicitantes inscritos al PICDAP</span>
                        </v-flex>
                        <v-flex xs12 md6>
                            <p class="headline font-italic">Tipo de documento</p>
                            <span class="subheading">FORMATO</span>
                        </v-flex>
                </v-layout>
                <v-layout row wrap>
                        <v-flex xs12 md6>
                            <p class="headline font-italic">Versión</p>
                            <span class="subheading">3</span>
                        </v-flex>
                        <v-flex xs12 md6>
                            <p class="headline font-italic">Fecha de emisión</p>
                            <span class="subheading">13 de abril del 2015</span>
                        </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import axios from 'axios';
import {mapState, mapMutations} from 'vuex';

export default {
    name: 'Letterhead',
    components:{Navigation},
    computed:{
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        // Obtiene los datos del membretado
        async getLetterheadData(){
            this.createKeyAuth();
            await axios.get("http://localhost:5000/addInfo",this.keyAuth)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        }
    },
    created() {
        this.getLetterheadData();
    },
}
</script>
