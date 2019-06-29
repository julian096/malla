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
                                                <v-radio-group row v-model="poll.q1">
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
                                                <v-radio-group row v-model="poll.q2">
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
                                            <p class="title">3.- La curación fue la adecuada para cumplir con el objetivo y programa.</p>
                                            <ValidationProvider name="value" rules="required">
                                                    <v-radio-group row v-model="poll.q3">
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
                                                    <v-radio-group row v-model="poll.q4">
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
                                                    <v-radio-group row v-model="poll.q5">
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
                                                    <v-radio-group row v-model="poll.q6">
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
                                                    <v-radio-group row v-model="poll.q7">
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
                                        <v-btn outline color="green" :disabled="invalid || !validated" @click="step=2">Siguiente</v-btn>
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
                                                <v-radio-group row v-model="poll.q8">
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
                                                <v-radio-group row v-model="poll.q9">
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
                                                <v-radio-group row v-model="poll.q10">
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
                                    <v-layout row justify-space-around>
                                        <v-btn outline color="light-blue lighten-2" @click="step=1">atras</v-btn>
                                        <v-btn outline color="green" :disabled="invalid || !validated" @click="step=3">Siguiente</v-btn>
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
                                                <v-radio-group row v-model="poll.q11">
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
                                                <v-radio-group row v-model="poll.q12">
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
                                                <v-radio-group row v-model="poll.q13">
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
                                                <v-radio-group row v-model="poll.q14">
                                                    <v-radio label="Si" value="Si"/>
                                                    <v-radio label="No" value="No"/>
                                                </v-radio-group>
                                            </ValidationProvider>
                                        </v-flex>
                                        <v-flex xs12>
                                                <v-textarea v-if="poll.q14 === 'Si'"
                                                            v-model="poll.reason"
                                                            label="¿Cómo?"
                                                            rows="3"/>
                                                <v-textarea v-else-if="poll.q14 === 'No'"
                                                            v-model="poll.reason"
                                                            label="¿Por qué?"
                                                            rows="3"/>
                                            </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                        <v-flex xs12>
                                            <ValidationProvider name="comment" rules="required">
                                                <v-textarea slot-scope="{errors, valid}"
                                                            v-model="poll.comment"
                                                            :error-messages="errors"
                                                            :success="valid"
                                                            label="Comentario sobre el curso"
                                                            rows="3"/>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row justify-space-around>
                                        <v-btn outline color="light-blue lighten-2" @click="step=2">Atras</v-btn>
                                        <v-btn outline color="green" :disabled="invalid || !validated || !btnDisable" @click="send">Enviar</v-btn>
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
export default {
    name: 'FormPoll',
    data() {
        return {
            snackbar: false,
            timeout: 2500,
            step: 1,
            btnDisable: true,
            poll:{
                q1:0,
                q2:0,
                q3:0,
                q4:0,
                q5:0,
                q6:0,
                q7:0,
                q8:0,
                q9:0,
                q10:0,
                q11:0,
                q12:0,
                q13:0,
                q14:"",
                reason:"",
                comment:""
            },
        }
    },
    methods: {
        send(){
            console.log(this.poll);
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