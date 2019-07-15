<template>
    <div>
        <Navigation/>
        <DataAvailableCourseAdmin/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataAvailableCourseAdmin from '@/components/Courses/DataAvailableCourseAdmin.vue';

export default {
    name: 'DetailAvailableCourseAdmin',
    components:{Navigation,DataAvailableCourseAdmin}
}
</script>