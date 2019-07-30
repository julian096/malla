<template>
    <div>
        <Navigation/>
        <DataCourseTaughtAdmin/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataCourseTaughtAdmin from '@/components/Courses/DataCourseTaughtAdmin.vue';

export default {
    name: 'DetailCourseTaughtAdmin',
    components:{Navigation, DataCourseTaughtAdmin}
}
</script>