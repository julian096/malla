<template>
	<div>
        <!-- Navigation para el admin -->
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless width="256" v-if="userType == 0">
            <v-toolbar flat class="transparent" color="red lighten-2" dark>
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="../../assets/logotec.png">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Malla docente</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile to="/perfil">
                    <v-list-tile-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Mi perfil</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile to="/registro">
                    <v-list-tile-action>
                        <v-icon>add_circle_outline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Registro</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-ripple to="/docentes">
                    <v-list-tile-action>
                        <v-icon>people_outline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Usuarios</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-group prepend-icon="event" no-action>
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>Cursos</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <v-list-tile v-for="item of itemsAdmin" :key="item.title" :to="{name: item.route}">
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>

                <v-list-tile v-ripple to="/membretado">
                    <v-list-tile-action>
                        <v-icon>view_headline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Membretado</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-ripple @click="dialogLimitDays = true">
                    <v-list-tile-action>
                        <v-icon>schedule</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Dias para la encuesta</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-ripple @click="dialogPDF = true">
                    <v-list-tile-action>
                        <v-icon>file_download</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Concentrado de datos</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-ripple @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cerrar sesión</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <!-- Navigation para el jefe de departamento -->
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless width="277" v-if="userType == 1">
            <v-toolbar flat class="transparent" color="red lighten-2" dark>
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="../../assets/logotec.png">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Malla docente</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile to="/perfil">
                    <v-list-tile-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Mi perfil</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'DocentesDelDep'}">
                    <v-list-tile-action>
                        <v-icon>people_outline</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Docentes</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-group prepend-icon="event_note" no-action>
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>Cursos</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <v-list-tile v-for="item of itemsBoss" :key="item.title" :to="{name: item.route}">
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>

                <v-list-tile v-ripple @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cerrar sesión</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <!-- Navigation para comunicación -->
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless width="256" v-if="userType == 2">
            <v-toolbar flat class="transparent" color="red lighten-2" dark>
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="../../assets/logotec.png">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Malla docente</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile to="/perfil">
                    <v-list-tile-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Mi perfil</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'CursosFolio'}">
                    <v-list-tile-action>
                        <v-icon>event_note</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cursos</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-ripple @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cerrar sesión</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <!-- Navigation para docente -->
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless width="277" v-if="userType == 3">
            <v-toolbar flat class="transparent" color="red lighten-2" dark>
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="../../assets/logotec.png">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Malla docente</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile :to="{name: 'Perfil'}">
                    <v-list-tile-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Mi perfil</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-group prepend-icon="event_note" no-action>
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>Cursos</v-list-tile-title>
                        </v-list-tile>
                    </template>
                    <v-list-tile v-for="item of itemsTeacher" :key="item.title" :to="{name: item.route}">
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>

                <v-list-tile v-ripple @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cerrar sesión</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <!-- Navigation para docente -->
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless width="277" v-if="userType == 4">
            <v-toolbar flat class="transparent" color="red lighten-2" dark>
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="../../assets/logotec.png">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>Malla docente</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile :to="{name: 'Perfil'}">
                    <v-list-tile-action>
                        <v-icon>perm_identity</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Mi perfil</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile :to="{name: 'CursosImpartidosExt'}">
                    <v-list-tile-action>
                        <v-icon>school</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cursos impartidos</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-ripple @click="logout">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Cerrar sesión</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <FormLimitDays :showDialog="dialogLimitDays" v-if="this.dialogLimitDays"/>
        <GetPDFDataConcentred :openPDF="dialogPDF"/>
	</div>
</template>

<script>
import {mapActions} from 'vuex';
import FormLimitDays from '@/components/Forms/FormLimitDays.vue';
import GetPDFDataConcentred from '@/views/Teachers/GetPDFDataConcentred.vue';
import EventBus from '@/bus.js';

export default {
    name: "Navigation",
    components:{FormLimitDays,GetPDFDataConcentred},
	data() {
		return {
            userType:null,
            registro:['Buscar','actualizar','borrar'],
            drawer: true,
            itemsAdmin: [
                { title: 'Todos los cursos', icon: 'event_note', route: 'Cursos' },
                { title: 'Cursos disponibles', icon: 'event_available', route: 'CursosDisponiblesAdmin' },
                { title: 'Mis cursos', icon: 'assignment', route: 'CursosDelAdmin'},
                { title: 'Cursos Impartidos', icon: 'school', route: 'CursosImpartidosAdmin'}
            ],
            itemsTeacher:[
                { title: 'Cursos disponibles', icon: 'event_available', route: 'CursosDisponibles'},
                { title: 'Solicitudes pendientes', icon: 'hourglass_empty', route: 'SolicitudesPendientes'},
                { title: 'Mis cursos', icon: 'assignment', route: 'MisCursos'},
                { title: 'Cursos impartidos', icon: 'school', route: 'CursosImpartidos'}
            ],
            itemsBoss:[
                {title: 'Cursos disponibles', icon: 'event_available', route: 'CursosDisponiblesJefe'},
                { title: 'Solicitudes pendientes', icon: 'hourglass_empty', route: 'SolicitudesPendientesJefe'},
                { title: 'Mis cursos', icon: 'assignment', route: 'MisCursosJefe'},
                { title: 'Cursos impartidos', icon: 'school', route: 'CursosImpartidosJefe'}
            ],
            mini: true,
            userType:0,
            dialogLimitDays: false,
            dialogPDF:false
		};
    },
    methods:{
        ...mapActions(['logout']),
    },
    created() {
        this.userType = sessionStorage.getItem("userType");
    },
    mounted() {
        EventBus.$on('closeLimitDays', () => {
            this.dialogLimitDays = false;
        });

        EventBus.$on('closePDF',() => {
            this.dialogPDF = false;
        });
    },
};
</script>