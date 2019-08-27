<template>
    <div>
        <v-dialog v-model="openPDF" max-width="330" persistent>
            <v-card>
                <v-toolbar card color="yellow darken-2" dark>
                    <v-icon>info_outline</v-icon>
                    <v-toolbar-title>Concentrado de datos</v-toolbar-title>
                </v-toolbar>
                <v-container text-xs-center>
                    <v-form>
                        <v-card-text>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <ValidationProvider name="limit days" rules="required">
                                        <v-select v-model="year"
                                                  slot-scope="{errors,valid}"
                                                  :error-messages="errors"
                                                  :success="valid"
                                                  label="Seleccione un año"
                                                  :items="items"/>
                                    </ValidationProvider>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-actions>
                            <v-layout row justify-space-around>
                                <v-btn outline color="green" :disabled="btnDisable" @click="getPDF">Aceptar</v-btn>
                                <v-btn outline color="red" @click="closePDF">Cancelar</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import {mapState, mapMutations} from 'vuex';
import EventBus from '../../bus';
import {ValidationProvider} from 'vee-validate';

export default {
    name: 'GetPDFDataConcentred',
    props:['openPDF'],
    components:{ValidationProvider},
    data() {
        return {
            items:[],
            year:"",
            btnDisable:false
        }
    },
    computed: {
        ...mapState(['keyAuth'])        
    },
    methods: {
        ...mapMutations(['createKeyAuth']),
        
        // Cierra el form para obtener el PDF
        closePDF(){
            EventBus.$emit('closePDF');
        },

        async getPDF(){
            try {
                const pdfDC = await axios.get(`/dataConcentrated/${this.year}`,this.keyAuth);
                    let name = "Concentrado"+this.year
                    let blob = new Blob([pdfPoll.data], { type:'application/pdf' } );
                    let link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = name;
                    link.target = '_blank';
                    link.click();
                    this.btnDisable = true;
                    setTimeout(()=>{
                        this.closePDF();
                        this.btnDisable = false;
                    },2000);
            } catch (error) {
                
            }
        }
    },
    async created() {
        this.createKeyAuth();
        try {
            const data = await axios.get(`/getYears`,this.keyAuth);
            for(let i of data.data.years){
                this.items.push(i);
            }
        } catch (error) {
        }
    },
}
</script>