<template>
    <div>
        <Navigation/>
        <h1>Datos del membrete {{$route.params.letterheadName}}</h1>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import {mapState, mapMutations} from 'vuex';

export default {
    name: 'DataLetterhead',
    components:{Navigation},
    data() {
        return {
            Letterhead:{
                emitDate:"",
                nameDocument:"",
                typeDocument:"",
                version:""
            }
        }
    },
    computed:{
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),

        async getDataLetterhead(){
            // crear la funcion que me obtendra los datos de un solo membrete
            console.log(this.$route.params.letterheadName);
        }
    },
    created(){
        this.getDataLetterhead();
    }
}
</script>