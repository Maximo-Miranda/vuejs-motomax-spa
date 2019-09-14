<template>
    <div>
        <header-component />
        <v-container>
            <router-view />
        </v-container>
    </div>
</template>

<script>
import HeaderComponent from './HeaderComponent'


export default {
    components: {
        HeaderComponent
    }
}
</script>