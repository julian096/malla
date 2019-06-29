<template>
    <div>
        <Navigation/>
        <DataTeacher/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import DataTeacher from '@/components/Teachers/DataTeacher.vue';

export default {
    name: 'DetailTeacher',
    components:{Navigation,DataTeacher}
}
</script>
