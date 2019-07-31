<template>
    <v-container>
        <Navigation />
        <v-layout column align-center>
            <p class="display-1">Página de registros</p>
        </v-layout>
        <v-layout row justify-center>
            <v-flex xs12 sm6 md4>
                <v-select :items="['Usuarios','Cursos']"
                          v-model="opt"
                          label="Seleccione una opción"
                          solo/>
            </v-flex>
        </v-layout>
        
        <FormUsers v-if="opt == 'Usuarios'"/>
        <FormCourses v-if="opt == 'Cursos'"/>
    </v-container>
</template>

<script>
import FormUsers from '@/components/Forms/FormUsers.vue';
import FormCourses from '@/components/Forms/FormCourses.vue';
import Navigation from '@/components/Navbars/Navigation.vue';

export default {
    name: 'Registro',
    components:{FormUsers,FormCourses,Navigation},
    data() {
        return {
            opt:""
        }
    }
}
</script>