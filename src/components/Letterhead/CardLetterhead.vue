<template>
    <div>
        <p class="display-1">Membretados</p>
        <v-layout row wrap class="mt-1">
            <v-flex xs12 sm4 md3 v-for="item of data" :key="item[0]" >
                <v-card elevation="7" :to="{name: 'Membretado', params:{letterheadName: item.nameDocument}}" >
                    <v-toolbar dark color="red lighten-2" card>
                        <p class="subheading">Membrete: {{item.nameDocument}}</p>
                    </v-toolbar>
                    <v-card-text>
                        <p class="subheading">Tipo de documento: {{item.typeDocument}}</p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'CardLetterhead',
    props:['data']
}
</script>