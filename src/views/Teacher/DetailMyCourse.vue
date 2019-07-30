<template>
    <div>
        <Navigation/>
        <DataMyCourse/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataMyCourse from '@/components/Courses/DataMyCourse';
export default {
    name: 'DetailMyCourse.vue',
    components:{Navigation,DataMyCourse}

}
</script>