<template>
    <div>
        <Navigation/>
        <DataCourseTaughtExt/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataCourseTaughtExt from '@/components/Courses/DataCourseTaughtExt';

export default {
    name: 'DetailCourseTaughtExt',
    components:{Navigation,DataCourseTaughtExt}
}
</script>