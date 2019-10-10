
<template>
    <div>
        <v-row>
            <v-col>
                <span class="headline">Usuarios</span>
            </v-col>
        </v-row>
        <!-- <div class="d-flex justify-start">
            <span class="headline">Usuarios</span>
        </div> -->
        <v-row justify="center">
            <v-col cols="12" xs="12" xl="8" >
                <v-card>
                    <v-card-title>
                        <v-container>

                            <v-row justify="end">
                                <!-- Full screen modal - create user -->
                                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
                                    </template>

                                    <v-card>
                                        <ValidationObserver v-slot="{ invalid, pristine, passes }">
                                            <form @submit.prevent="passes(saveUser)">

                                                <!-- dialogs buttons -->
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="dialog = false; initModel()">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>{{ user._id == '' ? 'Nuevo' : 'Editar' }}</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-toolbar-items>
                                                        <v-btn v-if="user._id == ''" dark text :disabled="pristine || invalid" type="submit">Guardar</v-btn>
                                                        <v-btn v-if="user._id != ''" dark text :disabled="invalid" type="submit">Guardar</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <!-- end -->

                                                <v-container>
                                                    <!-- name and lastname -->
                                                    <v-row>
                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="nombre" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Nombres"
                                                                        v-model="user.name"
                                                                        :error-messages="errors[0]"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12"  xs="12" md="6">
                                                            <ValidationProvider name="apellido" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Apellidos"
                                                                        v-model="user.lastname"
                                                                        :error-messages="errors[0]"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <!-- end -->

                                                    <!-- nacionality and type_indentification -->
                                                    <v-row>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="Nacionalidad" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Nacionalidad"
                                                                        v-model="user.nacionality"
                                                                        :error-messages="errors[0]"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12"  xs="12" md="6">
                                                            <ValidationProvider name="Tipo de identificacion" rules="required" v-slot="{ errors, classes }">
                                                                    <v-select
                                                                        :items="typeIdentification"
                                                                        label="Tipo de identificación"
                                                                        v-model="user.type_identification"
                                                                        :error-messages="errors[0]"
                                                                    ></v-select>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <!-- end -->

                                                    <!-- identification and phonenumber -->
                                                    <v-row>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="identificación" rules="required|uniqueIdentification" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Identificación"
                                                                        v-model="user.identification"
                                                                        :error-messages="errors[0]"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12"  xs="12" md="6">
                                                            <ValidationProvider name="celular" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Celular"
                                                                        v-model="user.phonenumber"
                                                                        :error-messages="errors[0]"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <!-- end -->

                                                    <!-- password and confirm password -->
                                                    <v-row v-if="user._id == ''">

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="contraseña" rules="required|password:confirmation" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Contraseña"
                                                                        v-model="user.password"
                                                                        :error-messages="errors[0]"
                                                                        :append-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                                                        :type="showPassword ? 'text' : 'password'"
                                                                        @click:append="showPassword = !showPassword"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12"  xs="12" md="6">
                                                            <ValidationProvider vid="confirmation" name="confirmación de contraseña" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Confirmar contraseña"
                                                                        v-model="confirm"
                                                                        :error-messages="errors[0]"
                                                                        :append-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                                                        :type="showPassword ? 'text' : 'password'"
                                                                        @click:append="showPassword = !showPassword"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <!-- end -->

                                                    <!-- role -->
                                                    <v-row>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="URL Foto" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="URL Foto"
                                                                        v-model="user.img"
                                                                        :error-messages="errors[0]"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="role" rules="required" v-slot="{ errors, classes }">
                                                                    <v-select
                                                                        :items="roles"
                                                                        label="Tipo de identificación"
                                                                        v-model="user.role"
                                                                        :error-messages="errors[0]"
                                                                    ></v-select>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <!-- end -->
                                                </v-container>
                                            </form>
                                        </ValidationObserver>

                                    </v-card>

                                </v-dialog>
                                <!-- End - Full screen modal -->
                            </v-row>

                            <v-row>
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
                            </v-row>

                        </v-container>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="userList" :search="search" class="elevation-2">

                        <template v-slot:item.action="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editUser(item)"
                            >
                                mdi-pen
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteUserDialog(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>

                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <!-- delete user dialog -->
        <v-dialog v-model="deleteDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">
                    Ests segur@ de realizar esta accion?
                </v-card-title>

                <v-card-text>
                    Los cambios no se podran revertir!
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn color="green darken-1" text @click="softDeleteUserFunc(userIDForDelete)">
                        Logico
                    </v-btn>

                    <v-btn color="green darken-1" text @click="deleteUserFunc(userIDForDelete)">
                        Fisico
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end -->

    </div>

</template>

<script>
import { mapActions } from 'vuex';
import { extend } from 'vee-validate';

export default {
    data() {
        return {
            search: '',
            headers: [],
            userList: [],
            dialog: false,
            deleteDialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            user:{
                _id: "",
                name: "",
                lastname: "",
                img: "n/a",
                nacionality: "",
                identification: "",
                type_identification: "",
                phonenumber: "",
                password: "",
                role: "",
            },
            userUpdateOldInfo: {},
            typeIdentification: [
                {text: "Seleccione un valor", value: ""},
                {text: "Cedula", value: "CEDULA"},
                {text: "Pasaporte", value: "PASSPORT"},
                {text: "Email", value: "EMAIL"},
            ],
            roles: [
                {text: "Seleccione un valor", value: ""},
                {text: "Root", value: "ROOT"},
                {text: "Administrador", value: "ADMINISTRATOR"},
                {text: "Conductor", value: "DRIVER"},
            ],
            showPassword: false,
            confirm:"",
            userIDForDelete: "",
        }
    },
    mounted () {

        this.users()
        this.initValidations()

    },
    methods:{
        ...mapActions(['getUsers', 'createUser', 'validateIndentification', 'updateUser', 'softDeleteUser', 'deleteUser']),
        initValidations(){

            extend('uniqueIdentification', {
                // Create vm property of type (function), because 'extend' no contain vue context (this)
                // NOTE: You don't create (vm: this), this will generate a error ('vue error in mounted hook rangeerror maximum call stack size exceed')
                vm: this.uniqueIdentification,
                validate: async function(value) {

                    return {
                        valid: await this.vm(value),
                        data: {
                            error: 'Identificacion no disponible'
                        }
                    };

                },
                message: `{error}`
            })

        },
        editUser(item){

            Object.assign(this.user, item)

            Object.assign(this.userUpdateOldInfo, this.user)

            this.dialog = true

        },
        deleteUserDialog(item){

            this.userIDForDelete = item._id

            this.deleteDialog = true

        },
        async softDeleteUserFunc(id){

            try {

                this.$store.commit('showLoading')

                await this.softDeleteUser(id)

                this.userIDForDelete = ""

                this.deleteDialog = false

                await this.users()

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: "success",
                    title: "Hola!",
                    text: "Usuario eliminado exitosamente!"
                })

            } catch (err) {

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: 'error',
                    title: 'Opps...',
                    text: err
                })

            }

        },
        async deleteUserFunc(id){

            try {

                this.$store.commit('showLoading')

                await this.deleteUser(id)

                this.userIDForDelete = ""

                this.deleteDialog = false

                await this.users()

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: "success",
                    title: "Hola!",
                    text: "Usuario eliminado exitosamente!"
                })

            } catch (err) {

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: 'error',
                    title: 'Opps...',
                    text: err
                })

            }

        },
        async users() {

            try {

                this.headers = [],
                this.userList = [],

                this.$store.commit('showLoading')

                let users = await this.getUsers()
                for(let i = 0; i < users.length; i++){

                    let record = {}

                    for (const [key, val] of Object.entries(users[i])) {

                        if(i == 0){
                            if(key != '_id' && key != 'img'){
                                this.headers.push({
                                    text: key,
                                    align: 'center',
                                    sortable: true,
                                    value: key
                                })
                            }                           
                        }

                        record[key] = val
                    }

                    this.userList.push(record)
                }

                this.headers.push({ text: 'Opciones', value: 'action', sortable: false },)

                this.$store.commit('showLoading')

            } catch (err) {

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: 'error',
                    title: 'Opps...',
                    text: err
                })

            }

        },
        async saveUser(){

            if(this.user._id == ''){

                try {

                    this.$store.commit('showLoading')

                    const userResponse = await this.createUser(this.user)

                    this.$store.commit('showLoading')

                    await this.users()

                    this.dialog = false

                    this.initModel()

                    this.$swal.fire({
                        type: 'success',
                        title: 'Hola!',
                        text: `Usuario ${userResponse.name} ${userResponse.lastname} creado exitosamente!`
                    })

                } catch (err) {

                    this.$store.commit('showLoading')

                    let message = ''

                    if(err.response.data.message.errors.identification){

                        message = `Identificacion ${this.user.identification} no disponible`

                    } else {
                        message = err
                    }

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: message
                    })

                }

            } else {

                try {

                    this.$store.commit('showLoading')

                    let keys = Object.keys(this.user).filter(k => this.user[k] !== this.userUpdateOldInfo[k]);

                    let info = {}

                    for( let key of keys ){
                        info[key] = this.user[key]
                    }

                    const userResponse = await this.updateUser({id: this.user._id, info})

                    this.$store.commit('showLoading')                    

                    await this.users()

                    this.dialog = false

                    this.initModel()

                    this.userUpdateOldInfo = {}

                    this.$swal.fire({
                        type: 'success',
                        title: 'Hola!',
                        text: `Usuario ${userResponse.name} ${userResponse.lastname} actualizado exitosamente!`
                    })

                } catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })

                }

            }

        },
        async uniqueIdentification(value){

            try {

                this.$store.commit('showLoading')

                const response = await this.validateIndentification(value)

                this.$store.commit('showLoading')

                if(!response) {

                    return true
                }

                if(response && this.user._id == response._id){

                    return true

                }

                return false

            } catch (err) {

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: 'error',
                    title: 'Opps...',
                    text: err
                })

            }

        },
        initModel(){

            // User object
            this.user._id = ""
            this.user.name = ""
            this.user.lastname = ""
            this.user.img = "n/a"
            this.user.nacionality = ""
            this.user.identification = ""
            this.user.type_identification = ""
            this.user.phonenumber = ""
            this.user.password = ""
            this.user.role = ""
            this.confirm = ""

        }
        // ...mapMutations(['showLoading'])
    },
    computed:{

    }
}
</script>
