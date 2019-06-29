<template>
    <v-container fluid grid-list-lg text-xs-center>
        
        <Navigation />
        <p class="display-1">Lista de docentes</p>
        
        <!-- Simbologia de colores -->
        <span class="title">Simbología de colores</span>    
        <v-layout row justify-space-around class="mt-3">
                <v-flex xs2>
                    <div class="green lighten-1 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Administrador</span></div>
                </v-flex>
                <v-flex xs2>
                    <div class="blue lighten-1 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Jefe de departamento</span></div>
                </v-flex>
                <v-flex xs2>
                    <div class="yellow darken-2 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Comunicación</span></div>
                </v-flex>
                <v-flex xs2>
                    <div class="red lighten-2 pt-1 pr-1 pb-1 pl-1"><span class="white--text body-2">Docente</span></div>
                </v-flex>
        </v-layout>
        
        <!-- aqui va el select para seleccionar el departamento -->
        <v-layout row justify-center>
            <v-flex xs12 sm6 md3 lg3>
                <v-select v-model="department"
                          :items="departments"
                          label="Seleccione un departamento"
                          solo/>
            </v-flex>
        </v-layout>
        <CardTeacher :depaSelect="department"/>

    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardTeacher from '@/components/Teachers/CardTeacher.vue';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'ListTeachers',
    components:{Navigation,CardTeacher},
    data() {
        return {
            department:"",
            departments:['Ciencias Básicas','Desarrollo Académico','Económico-Administrativo','Ingenierías','Ingeniería Industrial','Sistemas y Computación']
        }
    },
    computed:{
        ...mapState(['teachers'])
    },
    methods:{
        ...mapActions(['getTeachers'])
    },
    mounted(){
        this.getTeachers();
    }

}
</script>