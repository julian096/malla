<template>
    <div>
        <v-layout row wrap class="mt-1">
            <v-flex xs12 sm4 md3 v-for="item of data" :key="item[0]" v-show="year == item.year">
                <v-card elevation="7">
                    <v-toolbar dark color="green lighten-1" card>
                        <span class="subheading">{{item.course}}</span>
                    </v-toolbar>
                    <v-card-text>
                        <p><span class="subheading">Instructor: {{item.teacher}}</span></p>
                        <p><span class="subheading">Acreditación: {{item.qualified}}</span></p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'CardCoursesOfTeacher',
    props:['year','data'],
}
</script>