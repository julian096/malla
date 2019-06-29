<template>
    <v-container grid-list-lg text-xs-center>
        <Navigation/>
        <DataMyCourse/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataMyCourse from '@/components/Courses/DataMyCourse';
export default {
    name: 'DetailMyCourse.vue',
    components:{Navigation,DataMyCourse}

}
</script>