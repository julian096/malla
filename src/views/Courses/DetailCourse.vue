<template>
    <div>
        <Navigation />
        <DataCourse />
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataCourse from '@/components/Courses/DataCourse.vue';

export default {
    name: 'DetailCourse',
    components: {Navigation,DataCourse},
}
</script>