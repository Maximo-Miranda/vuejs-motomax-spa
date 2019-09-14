<template>
    <div>

        <v-app-bar ma0 color="primary" dark app>
        
        <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>

        <v-toolbar-title>Motomax</v-toolbar-title>

        <div class="flex-grow-1"></div>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        
        </v-app-bar>
        <LoadingComponent />
       

        <v-navigation-drawer v-model="drawer" absolute temporary>

            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Maximo Miranda</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>

                <v-list-item :to="{name: 'users'}" link>

                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Usuarios</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

                <v-list-item :to="{name: 'motorcycles'}" link>

                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Motos</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

                <v-list-item link>

                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Ingresar pago</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

                <v-list-item link>

                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Pagos</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

                <v-list-item :to="{name: 'login'}" link>
                    
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>Mantenimientos</v-list-item-title>
                        </v-list-item-content>

                </v-list-item>

            </v-list>

        </v-navigation-drawer>

    </div>
</template>

<script>
import LoadingComponent from './LoadingComponent'

export default {
    components: {
        LoadingComponent
    },
    data () {
        return {
            drawer: false,
        }
    }    
}
</script>