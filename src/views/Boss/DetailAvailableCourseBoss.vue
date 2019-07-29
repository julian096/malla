<template>
    <div>
        <Navigation/>
        <DataAvailableCourseBoss/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataAvailableCourseBoss from '@/components/Courses/DataAvailableCourseBoss.vue';
export default {
    name: 'DetailAvailableCourseBoss',
    components:{Navigation,DataAvailableCourseBoss}
}
</script>