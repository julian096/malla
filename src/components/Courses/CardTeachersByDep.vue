<template>
    <div>
        <v-layout row wrap class="mt-1">
            <v-flex xs12 sm4 md3 v-for="(item, index) of data" :key="item[0]" >
                <v-card elevation="7">
                    <v-toolbar dark color="green lighten-1" card :key="index">
                        <span class="subheading">{{item.name}}</span>
                    </v-toolbar>
                    <v-card-text>
                        <p><span class="subheading">RFC: {{item.rfc}}</span></p>
                        <p><span class="subheading">{{item.studyLevel}}: {{item.degree}}</span></p>
                        <v-layout row wrap>
                            <v-btn dark color="blue" outline block :to="{name: 'CursosDelDocente',params:{CursosDelDocente: item.rfc}}">Ver cursos tomados</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import EventBus from '../../bus';

export default {
    name: 'CardTeachersOfDep',
    props:['data']
}
</script>