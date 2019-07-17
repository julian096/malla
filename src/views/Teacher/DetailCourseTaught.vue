<template>
    <div>
        <Navigation/>
        <DataCourseTaught/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataCourseTaught from '@/components/Courses/DataCourseTaught';

export default {
    name: 'DetailCourseTaught',
    components:{Navigation,DataCourseTaught}
}
</script>