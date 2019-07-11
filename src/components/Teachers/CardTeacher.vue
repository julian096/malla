<template>
    <div>
        <v-layout row wrap class="mt-1">
            <v-flex xs12 sm4 md3 v-for="item of teachers" :key="item[0]" v-show="depaSelect ==  item.departament">
                <v-card elevation="7" :to="{name: 'Docente', params:{docente: item.rfc}}">
                    <v-toolbar card dark color="green lighten-1" v-if="item.userType == 'Administrador'">
                        <span class="subheading">{{item.name}}</span>
                    </v-toolbar>
                    <v-toolbar card dark color="blue lighten-1" v-if="item.userType == 'Jefe de departamento'">
                        <span class="subheading">{{item.name}}</span>
                    </v-toolbar>
                    <v-toolbar card dark color="yellow darken-2"   v-if="item.userType == 'Comunicación'">
                        <span class="subheading">{{item.name}}</span>
                    </v-toolbar>
                    <v-toolbar card dark color="red lighten-2" v-if="item.userType == 'Docente'">
                        <span class="subheading">{{item.name}}</span>
                    </v-toolbar>
                    <v-card-text>
                        <p><span class="subheading">RFC: {{item.rfc}}</span></p>
                        <p><span class="subheading">{{item.studyLevel}}: {{item.degree}}</span></p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'CardTeacher',
    props:['depaSelect'],
    data() {
        return {
            admin:true,
            boss:true,
            comm:true,
            teacher:true
        }
    },
    computed:{
        ...mapState(['teachers'])
    }
}
</script>