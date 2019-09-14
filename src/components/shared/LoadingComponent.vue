
<template>
    <v-progress-linear v-if="loading" indeterminate color="green" height="5px"></v-progress-linear>
</template>
<script>
import { mapState } from 'vuex'

export default {

    computed:{
        ...mapState({
            loading: ( state ) => state.generalStore.loading // or ( {userStore} ) => userStore.user --> destructuracion
        })
    }
    
}
</script>