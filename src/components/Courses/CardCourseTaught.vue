<template>
    <div>
        <v-layout row wrap class="mt-1">
            <v-flex xs12 sm4 md3 v-for="item of data" :key="item[0]" >
                <v-card elevation="7" :to="{name: 'CursoImpartido', params:{CursoImpartido: item.courseName}}" >
                    <v-toolbar dark color="green lighten-1" card v-if="item.state=='Por empezar'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-toolbar dark color="yellow darken-2" card v-else-if="item.state=='Cursando'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-toolbar dark color="red lighten-2" card v-else-if="item.state=='Terminado'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-card-text>
                        <p><span class="subheading">Duración: {{item.duration}}</span></p>
                        <p><span class="subheading">Horario: {{item.timetable}}</span></p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'CardCourseTaught',
    props:['data']
}
</script>