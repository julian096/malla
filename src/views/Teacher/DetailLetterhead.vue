<template>
    <v-container>
        <Navigation/>
        <DataLetterhead/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataLetterhead from '@/components/Letterhead/DataLetterhead.vue';

export default {
    name: 'DetailLetterhead',
    components:{Navigation,DataLetterhead}
}
</script>