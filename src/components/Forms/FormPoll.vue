<template>
    <v-container grid-list-lg>
        <v-layout row justify-center>
            <p class="display-1">Encuesta de satisfacción para participantes inscritos</p>
        </v-layout>
        <p class="body-2 font-italic">Instrucciones: Seleccione del 1 - 5 en base a su opinión, el nivel de satisfacción obtenida a lo largo del curso, donde 1 significa nada satisfecho y 5 significa muy satisfecho.</p>
        <v-snackbar v-model="snackbar" :timeout="timeout" top color="gray" class="light-green--text text--accent-3">Encuesta de satisfacción completa</v-snackbar>
        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step color="red lighten-2" :complete="step > 1" step="1">Evento</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step color="red lighten-2" :complete="step > 1" step="2">Instructor</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step color="red lighten-2" step="3">Desarrollo laboral</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <!-- Formulario 1 -->
                <v-stepper-content step="1">
                    <ValidationObserver ref="obs1">
                        <v-card slot-scope="{invalid, validated}">
                            <v-form>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">1.- El evento cubrió mis expectativas.</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.one">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">2.- Se cumplió con el objetivo y programa.</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.two">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">3.- La duración fue la adecuada para cumplir con el objetivo y programa.</p>
                                            <ValidationProvider name="value" rules="required">
                                                    <v-radio-group row v-model="poll.three">
                                                        <v-radio label="1" value="1"/>
                                                        <v-radio label="2" value="2"/>
                                                        <v-radio label="3" value="3"/>
                                                        <v-radio label="4" value="4"/>
                                                        <v-radio label="5" value="5"/>
                                                    </v-radio-group>
                                                </ValidationProvider>
                                       </v-flex>
                                       <v-flex xs12 md6 lg6>
                                            <p class="title">4.- Los contenidos del manual estuvieron estructurados en forma lógica, clara y sencilla.</p>
                                            <ValidationProvider name="value" rules="required">
                                                    <v-radio-group row v-model="poll.four">
                                                        <v-radio label="1" value="1"/>
                                                        <v-radio label="2" value="2"/>
                                                        <v-radio label="3" value="3"/>
                                                        <v-radio label="4" value="4"/>
                                                        <v-radio label="5" value="5"/>
                                                    </v-radio-group>
                                                </ValidationProvider>
                                       </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">5.- Los contenidos del curso son útiles para mi desempeño laboral.</p>
                                            <ValidationProvider name="value" rules="required">
                                                    <v-radio-group row v-model="poll.five">
                                                        <v-radio label="1" value="1"/>
                                                        <v-radio label="2" value="2"/>
                                                        <v-radio label="3" value="3"/>
                                                        <v-radio label="4" value="4"/>
                                                        <v-radio label="5" value="5"/>
                                                    </v-radio-group>
                                                </ValidationProvider>
                                       </v-flex>
                                       <v-flex xs12 md6 lg6>
                                            <p class="title">6.- Las condiciones físicas del aula en que se desarrolló el evento son las adecuadas (limpieza, ventilación, iluminación, sanitarios).</p>
                                            <ValidationProvider name="value" rules="required">
                                                    <v-radio-group row v-model="poll.six">
                                                        <v-radio label="1" value="1"/>
                                                        <v-radio label="2" value="2"/>
                                                        <v-radio label="3" value="3"/>
                                                        <v-radio label="4" value="4"/>
                                                        <v-radio label="5" value="5"/>
                                                    </v-radio-group>
                                                </ValidationProvider>
                                       </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">7. El personal organizador realizó las actividades necesarias para el mejor desarrollo del evento.</p>
                                            <ValidationProvider name="value" rules="required">
                                                    <v-radio-group row v-model="poll.seven">
                                                        <v-radio label="1" value="1"/>
                                                        <v-radio label="2" value="2"/>
                                                        <v-radio label="3" value="3"/>
                                                        <v-radio label="4" value="4"/>
                                                        <v-radio label="5" value="5"/>
                                                    </v-radio-group>
                                                </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm3>
                                            <v-btn outline block color="green" :disabled="invalid || !validated" @click="step=2">Siguiente</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </ValidationObserver>
                </v-stepper-content>

                <!-- Formulario 2 -->
                <v-stepper-content step="2">
                    <ValidationObserver ref="obs2">
                        <v-card slot-scope="{invalid, validated}">
                            <v-form>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">8.- El instructor mostró habilidad para transmitir el contenido del curso</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.eight">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">9.- El instructor expuso de manera clara y precisa el objetivo, el programa y criterios de evaluación del curso.</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.nine">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">10.- El instructor aclaró las dudas que se presentaron durante el curso.</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.ten">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm3>
                                            <v-btn outline block color="light-blue lighten-2" @click="step=1">atras</v-btn>
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <v-btn outline block color="green" :disabled="invalid || !validated" @click="step=3">Siguiente</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </ValidationObserver>
                </v-stepper-content>

                <!-- Formulario 3 -->
                <v-stepper-content step="3">
                    <ValidationObserver ref="obs3">
                        <v-card slot-scope="{invalid, validated}">
                            <v-form>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">11.- Las competencias desarrolladas con el evento mejorarán mi desempeño docente y/o profesional</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.eleven">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                        <v-flex xs12 md6 lg6>
                                            <p class="title">12.- Las competencias adquiridas con el evento propiciarán el trabajo colaborativo.</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.twelve">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <p class="title">13.- Las competencias adquiridas me permitirán mayor comprensión de mis funciones y responsabilidades en la institución.</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.thirteen">
                                                    <v-radio label="1" value="1"/>
                                                    <v-radio label="2" value="2"/>
                                                    <v-radio label="3" value="3"/>
                                                    <v-radio label="4" value="4"/>
                                                    <v-radio label="5" value="5"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <p class="title">14.- Participo en la detección de necesidades de capacitación en mi departamento académico.</p>
                                            <ValidationProvider name="value" rules="required">
                                                <v-radio-group row v-model="poll.fourteen">
                                                    <v-radio label="Si" value="Si"/>
                                                    <v-radio label="No" value="No"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                        <v-flex xs12>
                                                <v-textarea v-if="poll.fourteen == 'Si'"
                                                            v-model="poll.reason"
                                                            label="¿Cómo?"
                                                            rows="3"/>
                                                <v-textarea v-else-if="poll.fourteen == 'No'"
                                                            v-model="poll.reason"
                                                            label="¿Por qué?"
                                                            rows="3"/>
                                            </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="comment" rules="required">
                                                <v-textarea slot-scope="{errors, valid}"
                                                            v-model="poll.commentaries"
                                                            :error-messages="errors"
                                                            :success="valid"
                                                            label="Comentario sobre el curso"
                                                            rows="3"/>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm4>
                                            <v-btn outline block color="light-blue lighten-2" }@click="step=2">Atras</v-btn>
                                        </v-flex>
                                        <v-flex xs12 sm4>
                                            <v-btn outline block color="green" :disabled="invalid || !validated || !btnDisable" @click="send">Enviar</v-btn>
                                        </v-flex>
                                        <v-flex xs12 sm4>
                                            <v-btn outline block color="orange" :disabled="btnDisable" :to="{name: 'MiCurso'}">Volver al curso</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-form>
                        </v-card>
                    </ValidationObserver>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import {mapState, mapMutations} from 'vuex';
import axios from 'axios';

export default {
    name: 'FormPoll',
    data() {
        return {
            snackbar: false,
            timeout: 2500,
            step: 1,
            btnDisable: true,
            poll:{
                one:0,
                two:0,
                three:0,
                four:0,
                five:0,
                six:0,
                seven:0,
                eight:0,
                nine:0,
                ten:0,
                eleven:0,
                twelve:0,
                thirteen:0,
                fourteen:"",
                reason:"",
                commentaries:""
            },
        }
    },
    computed: {
        ...mapState(['keyAuth'])
    },
    methods: {
        ...mapMutations(['createKeyAuth']),

        // Envia los datos para la generacion del PDF de la encuesta
        async send(){
            this.createKeyAuth();
            try {
                const pdfPoll = await axios.post("http://localhost:5000/course/"+this.$route.params.MiCurso+"/poll",this.poll,this.keyAuth);
                let name = "Encuesta"+this.$route.params.MiCurso.replace(" ","");
                this.btnDisable = true;
                let blob = new Blob([pdfPoll.data], { type:'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = name;
                link.target = '_blank';
                link.click();
            } catch (error) {
                console.error(error);
            }
            this.btnDisable = false;
            this.snackbar = true;
        }
    },
    components:{
        ValidationObserver,
        ValidationProvider
    }
}
</script>