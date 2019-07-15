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
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless width="256" v-if="userType == 1">
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

                <v-list-tile :to="{name: 'CursosDisponiblesJefe'}">
                    <v-list-tile-action>
                        <v-icon>event_available</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Cursos disponibles</v-list-tile-title>
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
        <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless width="256" v-if="userType == 3">
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
	</div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: "Navigation",
	data() {
		return {
            userType:null,
            registro:['Buscar','actualizar','borrar'],
            drawer: true,
            itemsAdmin: [
                { title: 'Todos los cursos', icon: 'event_note', route: 'Cursos' },
                { title: 'Cursos disponibles', icon: 'event_available', route: 'CursosDisponiblesAdmin' },
                { title: 'Mis cursos', icon: 'assignment', route: 'CursosDelAdmin'}
            ],
            itemsTeacher:[
                { title: 'Cursos disponibles', icon: 'event_available', route: 'CursosDisponibles'},
                { title: 'Mis cursos', icon: 'assignment', route: 'MisCursos'},
                { title: 'Cursos impartidos', icon: 'school', route: 'CursosImpartidos'}
            ],
            mini: true,
            userType:0
		};
    },
    methods:{
        ...mapActions(['logout']),
    },
    created() {
        this.userType = sessionStorage.getItem("userType");
    },
};
</script>