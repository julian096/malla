<template>
    <div>
        <Navigation/>
        <DataAvailableCourse />
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataAvailableCourse from '@/components/Courses/DataAvailableCourse.vue';

export default {
    name: 'DetailAvailableCourse',
    components:{Navigation,DataAvailableCourse}
}
</script>