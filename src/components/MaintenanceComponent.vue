<template>
    <div>
        <v-row>
            <v-col>
                <span class="headline">Mantenimientos</span>
            </v-col>
        </v-row>

        <!-- Maintenance Datatable -->
        <v-row justify="center">
            <v-col cols="12" xs="12" xl="8">
                <v-card>

                    <v-card-title>
                        <v-container>
                            <v-row justify="end">
                                <v-btn @click="createNewMaintenance"><v-icon>mdi-plus</v-icon></v-btn>
                            </v-row>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-container>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="maintenanceList" :search="search" class="elevation-2">

                        <template v-slot:item.action="{ item }">

                            <v-icon small @click="patchMaintenance(item)" class="mr-2">
                                mdi-pen
                            </v-icon>

                            <v-icon small @click="deleteMaintenanceDialog(item)">
                                mdi-delete
                            </v-icon>

                        </template>

                    </v-data-table>

                </v-card>
            </v-col>
        </v-row>
        <!-- End -->

        <!-- Maintenance dialog -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">

            </template>

            <v-card>
                <ValidationObserver ref="observer" v-slot="{ invalid, pristine, passes }">
                    <form @submit.prevent="passes(saveMaintenance)" enctype="multipart/form-data">

                        <!-- dialogs buttons -->
                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click="closeDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title>Editar</v-toolbar-title>
                            <div class="flex-grow-1"></div>
                            <v-toolbar-items>
                                <v-btn dark text :disabled="pristine || invalid" type="submit">
                                    Guardar
                                </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <!-- end -->
                        <v-container>

                            <v-row v-if="maintenanceModel.id" justify="center">

                                <v-img :src="image" max-width="300"  max-height="300"></v-img>

                            </v-row>

                            <div class="pa-4" v-if="maintenanceModel.id" justify="center">
                                <v-divider></v-divider>
                            </div>

                            <v-row>

                                <v-col cols="12" xs="12" md="6">
                                    <ValidationProvider name="user" rules="required"
                                                        v-slot="{ errors, classes }">
                                        <v-select
                                                :items="users"
                                                item-text="name"
                                                item-value="_id"
                                                label="User"
                                                v-model="maintenanceModel.user_id"
                                                :error-messages="errors[0]"
                                        ></v-select>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12" xs="12" md="6">
                                    <ValidationProvider name="value" rules="required"
                                                        v-slot="{ errors, classes }">
                                        <v-text-field label="value"
                                                      v-model="maintenanceModel.value"
                                                      :error-messages="errors[0]"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>

                            </v-row>

                            <v-row>
                                <v-col cols="12" xs="12" md="6">

                                    <ValidationProvider name="moto" rules="required"
                                                        v-slot="{ errors, classes }">
                                        <v-select
                                                :items="motorcycles"
                                                item-text="license_plate"
                                                item-value="_id"
                                                label="Moto"
                                                v-model="maintenanceModel.motorcycle_id"
                                                :error-messages="errors[0]"
                                        ></v-select>

                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12" xs="12" md="6">
                                    <ValidationProvider name="tipo" rules="required"
                                                        v-slot="{ errors, classes }">
                                        <v-select
                                                :items="maintenanceTypes"
                                                label="Tipo"
                                                v-model="maintenanceModel.type_maintenance"
                                                :error-messages="errors[0]"
                                        ></v-select>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" xs="12" md="12">
                                    <ValidationProvider name="tipo" rules="image"
                                                        v-slot="{ errors, classes, validate }">
                                        <v-file-input
                                                type="file"
                                                ref="myfile"
                                                v-model="maintenanceModel.photos"
                                                @change="validate"
                                                :rules="rules"
                                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                                show-size
                                                placeholder="Foto"
                                                prepend-icon="mdi-camera"
                                                label="Foto"
                                                :error-messages="errors[0]"
                                        ></v-file-input>

                                    </ValidationProvider>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12" xs="12" md="12">
                                    <ValidationProvider name="descripción" rules="max:1000|required"
                                                        v-slot="{ errors, classes }">
                                        <v-textarea
                                                name="descripción"
                                                filled
                                                label="Descripción"
                                                auto-grow
                                                placeholder="Ninguno"
                                                v-model="maintenanceModel.description"
                                                :error-messages="errors[0]"
                                        ></v-textarea>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>

                        </v-container>

                    </form>
                </ValidationObserver>
            </v-card>
        </v-dialog>
        <!-- End dialog -->

        <!-- delete payment dialog -->
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

                    <v-btn color="green darken-1" text @click="softDeleteMaintenanceFunc(maintenanceIDForDelete)">
                        Logico
                    </v-btn>

                    <v-btn color="green darken-1" text @click="deleteMaintenanceFunc(maintenanceIDForDelete)">
                        Fisico
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end -->

    </div>
</template>


<script>
    import {mapActions} from 'vuex';

    export default {
        name: "MaintenanceComponent",
        mounted() {

            this.getAllUsers()
            this.getAllMotorcycles()
            this.getMaitenancesIndex()

        },
        data: () => {
            return {
                search: '',
                headers: [],
                maintenanceList: [],
                dialog: false,
                motorcycles: [],
                users: [],
                rules: [
                    value => !value || value.size < 1000000 || 'Image size should be less than 1 MB!',
                ],
                maintenanceModel: {
                    id: '',
                    user_id: '',
                    motorcycle_id: '',
                    value: '',
                    description: 'Ninguno',
                    type_maintenance: '',
                    photos: null,
                    url_photo: '',
                },
                maintenanceTypes: [
                    {text: "-- Select type --", value: ""},
                    {text: "Correctivo", value: "CORRECTIVE"},
                    {text: "Preventivo", value: "PREVENTIVE"},
                    {text: "Sostenimiento", value: "SUSTENANCE"},
                ],
                deleteDialog: false,
                maintenanceIDForDelete: '',
                image: '',
            }
        },
        methods: {
            ...mapActions([
                "getMaintenances",
                "getMotorcycles",
                "getUsers",
                "createMaintenance",
                "softDeleteMaintenance",
                "deleteMaintenance",
                "getMaintenanceByID",
                "updateMaintenance",
                "createImage",
                "deleteImage",
            ]),
            async getMaitenancesIndex(){

                try {

                    this.headers = []
                    this.maintenanceList = []

                    this.$store.commit('showLoading')

                    let maintenances = await this.getMaintenances()

                    if (maintenances.length > 0){


                        for (let i = 0; i < maintenances.length; i++) {

                            let record = {}

                            for (const [key, val] of Object.entries(maintenances[i])) {

                                if (i == 0) {
                                    if (key != '_id' && key != '__v'  && key != 'photos' && key != 'url_photo') {
                                        this.headers.push({
                                            text: key,
                                            align: 'center',
                                            sortable: true,
                                            value: key
                                        })
                                    }
                                }

                                if (key == 'user') {
                                    record[key] = `${val.name} ${val.lastname}`
                                } else if (key == 'motorcycle') {
                                    record[key] = val.license_plate
                                } else {
                                    record[key] = val
                                }

                            }

                            this.maintenanceList.push(record)
                        }

                    }


                    this.headers.push({text: 'Opciones', value: 'action', sortable: false},)

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
            createNewMaintenance(){

                this.dialog = true

            },
            async patchMaintenance(item){

                try{

                    this.$store.commit('showLoading')

                    const maintenance = await this.getMaintenanceByID({id: item._id})

                    this.maintenanceModel.id = maintenance._id
                    this.maintenanceModel.user_id = maintenance.user._id
                    this.maintenanceModel.motorcycle_id = maintenance.motorcycle._id
                    this.maintenanceModel.description = maintenance.description
                    this.maintenanceModel.value = maintenance.value
                    this.maintenanceModel.type_maintenance = maintenance.type_maintenance
                    this.maintenanceModel.url_photo = maintenance.url_photo
                    this.image = `${process.env.VUE_APP_STORAGE_URL}/${maintenance.url_photo}`

                    this.$store.commit('showLoading')

                    this.dialog = true

                }catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })

                }

            },
            async saveMaintenance(){

                try{

                    this.dialog = false 

                    this.$store.commit('showLoading')

                    let formData = new FormData();
                    let formDataStorage = new FormData();

                    let imageUrl = '/storate/no-image'

                    if (this.maintenanceModel.photos) {

                        formDataStorage.append("photo", this.maintenanceModel.photos)
                        formDataStorage.append("api_key", process.env.VUE_APP_STORAGE_KEY)

                        imageUrl = await this.createImage(formDataStorage)

                        if (this.maintenanceModel.id != '') {

                            await this.deleteImage({api_key: process.env.VUE_APP_STORAGE_KEY, pathfile: this.maintenanceModel.url_photo})

                        }

                    }

                    if (this.maintenanceModel.description == ''){
                        this.maintenanceModel.description = "Ninguno"
                    }

                    // additional data
                    formData.append("user_id", this.maintenanceModel.user_id)
                    formData.append("motorcycle_id", this.maintenanceModel.motorcycle_id)
                    formData.append("value", this.maintenanceModel.value)
                    formData.append("description", this.maintenanceModel.description)
                    formData.append("type_maintenance", this.maintenanceModel.type_maintenance)
                    formData.append("url_photo", imageUrl)

                    if(this.maintenanceModel.id != '') {

                        await this.updateMaintenance({id: this.maintenanceModel.id, info: formData})

                    } else {

                        await this.createMaintenance(formData)

                    }

                    // You should call it on the next frame
                    requestAnimationFrame(() => {
                        this.$refs.observer.reset();
                    });

                    this.$store.commit('showLoading')

                    await this.getMaitenancesIndex()

                    this.initModel()

                } catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })

                }


            },
            deleteMaintenanceDialog(item){

                this.maintenanceIDForDelete = item._id

                this.deleteDialog = true

            },
            async softDeleteMaintenanceFunc(id){

                try {

                    this.$store.commit('showLoading')

                    await this.softDeleteMaintenance(id)

                    this.maintenanceIDForDelete = ""

                    this.deleteDialog = false

                    await this.getMaitenancesIndex()

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: "success",
                        title: "Hola!",
                        text: "Mantenimiento eliminado exitosamente!"
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
            async deleteMaintenanceFunc(id){

                try {

                    this.$store.commit('showLoading')

                    const maintenance = await this.getMaintenanceByID({id})

                    this.maintenanceModel.id = maintenance._id
                    this.maintenanceModel.url_photo = maintenance.url_photo

                    if (this.maintenanceModel.id != '') {

                        await this.deleteImage({api_key: process.env.VUE_APP_STORAGE_KEY, pathfile: this.maintenanceModel.url_photo})

                    }

                    await this.deleteMaintenance(id)

                    this.maintenanceIDForDelete = ""

                    this.deleteDialog = false

                    await this.getMaitenancesIndex()

                    this.initModel()

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: "success",
                        title: "Hola!",
                        text: "Mantenimiento eliminado exitosamente!"
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

            // Motorcycle Method
            async getAllMotorcycles() {
                try {

                    this.$store.commit('showLoading')

                    this.motorcycles = await this.getMotorcycles()

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

            // User Method
            async getAllUsers() {

                try {

                    this.$store.commit('showLoading')

                    this.users = await this.getUsers()

                    this.$store.commit('showLoading')

                } catch (err) {

                    this.$store.commit('showLoading')

                    if(err.response){
                        if(Number(err.response.status) == 401){
                            this.$store.commit('userLogout')
                            this.$router.push({name: 'login'})
                        }
                    }

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })

                }

            },
            closeDialog(){

                this.initModel()

                this.dialog = false

            },
            initModel(){

                this.maintenanceModel.id =  ''
                this.maintenanceModel.user_id =  ''
                this.maintenanceModel.motorcycle_id =  ''
                this.maintenanceModel.value =  ''
                this.maintenanceModel.description =  ''
                this.maintenanceModel.photos = null
                this.maintenanceModel.type_maintenance =  ''
                this.maintenanceModel.url_photo =  ''

                this.maintenanceIDForDelete = ''

            }
        }
    }
</script>