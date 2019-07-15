<template>
    <div>
       <Navigation/>
       <DataMyCourseAdmin/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataMyCourseAdmin from '@/components/Courses/DataMyCourseAdmin.vue';

export default {
    name: 'DetailMyCourseAdmin',
    components:{Navigation,DataMyCourseAdmin}
}
</script>