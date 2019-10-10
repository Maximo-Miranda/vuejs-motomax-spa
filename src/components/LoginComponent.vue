<template>

        <v-container fill-height>
            <v-layout align-center justify-center>
     
                <v-col cols="col-xs12 col-sm-8 col-md-4">
                    <v-card :loading="loading" class="elevation-12">
                        <ValidationObserver v-slot="{ invalid, pristine, passes }">
                            <form @submit.prevent="passes(loginAccount)">
                                <v-toolbar dark color="primary">
                                    Inicio de sesión
                                </v-toolbar>
                                
                                <v-card-text>
                                        <ValidationProvider name="identificación" rules="required" v-slot="{ errors, classes }">
                                
                                            <v-text-field label="Identificación" 
                                                v-model="account.identification"
                                                :error-messages="errors[0]"
                                            ></v-text-field>

                                        </ValidationProvider>
                                       
                                        <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                                            <v-text-field label="Password" 
                                                v-model="account.password"
                                                :error-messages="errors[0]"
                                                :append-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"  
                                                :type="showPassword ? 'text' : 'password'"
                                                @click:append="showPassword = !showPassword"
                                            ></v-text-field>
                                        </ValidationProvider>                            
                                    
                                </v-card-text>                        

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn :disabled="pristine || invalid" color="primary" type="submit">Iniciar</v-btn>
                                </v-card-actions>
                            </form>
                        </ValidationObserver>
                    </v-card>

                </v-col>   
         
            </v-layout>
        </v-container>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'LoginComponent',
    mounted () {
        // this.loginAccount()
    },
    data () {
        return {
            account: {
                identification: '',
                password: ''
            },
            showPassword: false,
						loading: false,
			
        }
    },
    methods: {
        ...mapActions(['login']),
        async loginAccount() {

            try {							

                this.loading = !this.loading

                await this.login(this.account)

                localStorage.setItem('motomax_token', this.user.token)

                this.loading = !this.loading

                this.$router.push({name: 'home'})

            } catch (err) {
                
                this.loading = !this.loading

                let message = 'Error interno del servidor.'

                if(err.response){
                    if(err.response.status == 400){
                          message = 'Credenciales invalidas.'
                    }
                } else {
                    message = err
                }

                this.$swal.fire({
                    type: 'error',
                    title: 'Opps...',
                    text: message
                })

            }
           
        }
    },
    computed: {
        ...mapState({
            user: ( state ) => state.userStore.user // or ( {userStore} ) => userStore.user --> destructuracion
        })
    }
}
</script>
