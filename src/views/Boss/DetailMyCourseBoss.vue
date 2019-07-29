<template>
    <div>
        <Navigation/>
        <DataMyCourseBoss/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataMyCourseBoss from '@/components/Courses/DataMyCourseBoss.vue';

export default {
    name: 'CoursesTaughtBoss',
    components:{Navigation, DataMyCourseBoss}
}
</script>