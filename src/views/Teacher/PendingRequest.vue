<template>
    <v-container text-xs-center grid-list-lg>
        <Navigation/>
        <p class="display-1">Solicitudes pendientes de cursos</p>
        <CardPendingRequest :data="arrayPendingRequests" v-if="arrayPendingRequests.length"/>

        <v-layout class="mt-5" row justify-center v-else>
            <v-flex xs12>
                <span class="title">No hay peticiones pendientes de cursos</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import CardPendingRequest from '@/components/Courses/CardPendingRequest.vue';
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';
import EventBus from '../../bus';

export default {
    name: 'PendingRequest',
    components:{Navigation, CardPendingRequest},
    data() {
        return {
            arrayPendingRequests:[]
        }
    },
    computed: {
        ...mapState(['keyAuth'])
    },
    methods:{
        ...mapMutations(['createKeyAuth']),
    
        // Obtiene las peticiones de cursos
        async getPendingRequests(){
            this.createKeyAuth();
            try {
                const response = await axios.get("/getRequests",this.keyAuth);
                this.arrayPendingRequests = response.data.courses;
            } catch (error) {
            }
        },
    },
    mounted() {
        EventBus.$on('removeRequest', async dataRequest => {
            try {
                await axios.get('/cancelRequest/'+dataRequest[1], this.keyAuth);
                this.arrayPendingRequests.splice(dataRequest[0],1);
            } catch (error) {
                console.error(error);   
            }
        })
    },
    created(){
        this.getPendingRequests();
    }
}
</script>