<template>
    <div>
        <Navigation/>
        <FormPoll/>
    </div>
</template>

<script>
import Navigation from '@/components/Navbars/Navigation.vue';
import FormPoll from '@/components/Forms/FormPoll.vue';

export default {
    name: 'Poll',
    components:{Navigation,FormPoll}
}
</script>