<template>
    <v-container text-xs-center grid-list-lg>
        <Navigation/>
        <CardLetterhead :data="letterheads"/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardLetterhead from '@/components/Letterhead/CardLetterhead.vue';
import {mapState, mapActions} from 'vuex';

export default {
    name: 'Letterhead',
    components:{Navigation,CardLetterhead},
    computed:{
        ...mapState(['keyAuth','letterheads'])
    },
    methods:{

        ...mapActions(['getLetterheads']),
    },
    created() {
        this.getLetterheads();
    },
}
</script>
