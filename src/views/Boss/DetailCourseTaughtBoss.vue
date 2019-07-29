<template>
    <v-container>
        <Navigation/>
        <DataCourseTaughtBoss/>
    </v-container>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataCourseTaughtBoss from '@/components/Courses/DataCourseTaughtBoss.vue';

export default {
    name: 'DetailCourseTaughtBoss',
    components:{Navigation, DataCourseTaughtBoss}
}
</script>