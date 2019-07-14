<template>
    <div>
        <!-- Abrira la vista de los detalles del curso para el docente -->
        <v-layout row wrap class="mt-1" v-if="userType == 3">
            <v-flex xs12 sm4 md3 v-for="item of data" :key="item[0]" >
                <v-card elevation="7" :to="{name: 'CursoDisponible', params:{cursoDisp: item.courseName}}">
                    <v-toolbar dark color="green lighten-1" card v-if="item.state=='Por empezar'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-toolbar dark color="yellow darken-2" card v-else-if="item.state=='Cursando'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-card-text>
                        <p><span class="subheading">Instructor: {{item.teacherName}}</span></p>
                        <p><span class="subheading">Horario: {{item.timetable}}</span></p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- Abrira la lista de los docentes que solicitaron el curso seleccionado -->
        <v-layout row wrap class="mt-1" v-if="userType == 0">
            <v-flex xs12 sm4 md3 v-for="item of data" :key="item[0]" >
                <v-card elevation="7" :to="{name: 'PeticionCurso', params:{listaPeticion: item.courseName}}">
                    <v-toolbar dark color="green lighten-1" card v-if="item.state=='Por empezar'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-toolbar dark color="yellow darken-2" card v-else-if="item.state=='Cursando'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-card-text>
                        <p><span class="subheading">Instructor: {{item.teacherName}}</span></p>
                        <p><span class="subheading">Horario: {{item.timetable}}</span></p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <!-- Abrira la lista para recomendar los docentes al curso -->
        <v-layout row wrap class="mt-1" v-if="userType == 1">
            <v-flex xs12 sm4 md3 v-for="item of data" :key="item[0]" >
                <v-card elevation="7">
                    <v-toolbar dark color="green lighten-1" card v-if="item.state=='Por empezar'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-toolbar dark color="yellow darken-2" card v-else-if="item.state=='Cursando'">
                        <span class="subheading">Curso: {{item.courseName}}</span>
                    </v-toolbar>
                    <v-card-text>
                        <p><span class="subheading">Instructor: {{item.teacherName}}</span></p>
                        <p><span class="subheading">Horario: {{item.timetable}}</span></p>
                        <v-layout row wrap>
                            <v-btn dark color="blue" block :to="{name: 'RecomendarDocente', params:{recDocente: item.courseName}}">Recomendar docente</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'CardAvailableCourse',
    props:['data'],
    data() {
        return {
            userType: sessionStorage.getItem("userType")
        }
    }
}
</script>
