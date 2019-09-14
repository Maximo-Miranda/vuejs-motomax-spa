
<template>
    <div>
        <v-row>
            <v-col>
                <span class="headline">Motos</span>
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
                                <!-- Full screen modal - create motorcycle -->
                                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
                                    </template>

                                    <v-card>
                                        <ValidationObserver v-slot="{ invalid, pristine, passes }">
                                            <form @submit.prevent="passes(saveMotorcycle)">

                                                <!-- dialogs buttons -->
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="dialog = false; initModel()">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>{{ motorcycle._id == '' ? 'Nuevo' : 'Editar' }}</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-toolbar-items>
                                                        <v-btn v-if="motorcycle._id == ''" dark text :disabled="pristine || invalid" type="submit">Guardar</v-btn>
                                                        <v-btn v-if="motorcycle._id != ''" dark text :disabled="invalid" type="submit">Guardar</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <!-- end -->

                                                <v-container>
                                                    <!-- brand and model -->
                                                    <v-row>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="Marca" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Marca"
                                                                        v-model="motorcycle.brand"
                                                                        :error-messages="errors[0]"
                                                                        @input="motorcycle.brand = $event.toUpperCase()"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12"  xs="12" md="6">
                                                            <ValidationProvider name="modelo" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Modelo"
                                                                        v-model="motorcycle.model"
                                                                        :error-messages="errors[0]"
                                                                        @input="motorcycle.model = $event.toUpperCase()"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <!-- end -->

                                                    <!-- color and license_plate -->
                                                    <v-row>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="color" rules="required" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Color"
                                                                        v-model="motorcycle.color"
                                                                        :error-messages="errors[0]"
                                                                        @input="motorcycle.color = $event.toUpperCase()"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="placa" rules="required|uniqueLicensePlate" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Placa"
                                                                        v-model="motorcycle.license_plate"
                                                                        :error-messages="errors[0]"
                                                                        @input="motorcycle.license_plate = $event.toUpperCase()"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <!-- end -->

                                                    <!-- price and date_of_purchase -->
                                                    <v-row>

                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="precio de compra" rules="required|numeric" v-slot="{ errors, classes }">
                                                                    <v-text-field label="Precio de compra"
                                                                        v-model="motorcycle.price"
                                                                        :error-messages="errors[0]"
                                                                        prefix="$"
                                                                        type="number"
                                                                    ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12"  xs="12" md="6">
                                                            
                                                                    <!-- <v-text-field label="Fecha de compra"
                                                                        v-model="motorcycle.date_of_purchase"
                                                                        :error-messages="errors[0]"
                                                                    ></v-text-field> -->

                                                                    
                                                                        <v-menu
                                                                            v-model="menu1"
                                                                            :close-on-content-click="false"
                                                                            transition="scale-transition"
                                                                            offset-y
                                                                            full-width
                                                                            max-width="290px"
                                                                            min-width="290px"
                                                                        >
                                                                        <template v-slot:activator="{ on }">
                                                                            
                                                                                <v-text-field
                                                                                    :value="computedDateFormattedMomentjs"
                                                                                    label="Fecha de compra"
                                                                                    persistent-hint
                                                                                    prepend-icon="mdi-calendar-month"
                                                                                    v-on="on"
                                                                                ></v-text-field>
                                                                            
                                                                        </template>
                                                                        <ValidationProvider name="fecha de compra" rules="required" v-slot="{ errors, classes }">
                                                                            <v-date-picker v-model="motorcycle.date_of_purchase" no-title @input="menu1 = false"></v-date-picker>
                                                                        </ValidationProvider>
                                                                        </v-menu>

                                                            
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
                    <v-data-table :headers="headers" :items="motorcyclesList" :search="search" class="elevation-2">

                        <template v-slot:item.action="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editMotorcycle(item)"
                            >
                                mdi-pen
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteMotorcycleDialog(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>

                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <!-- delete motorcycle dialog -->
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

                    <v-btn color="green darken-1" text @click="softDeleteMotorcycleFunc(motorcycleIDForDelete)">
                        Logico
                    </v-btn>

                    <v-btn color="green darken-1" text @click="deleteMotorcycleFunc(motorcycleIDForDelete)">
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
import moment from 'moment';

export default {
    
    mounted () {

        this.motorcycle.date_of_purchase = new Date().toISOString().substr(0, 10)

        this.motorcycles()
        this.initValidations()

    },
    data() {
        return {
            search: '',
            headers: [],
            motorcyclesList: [],
            dialog: false,
            deleteDialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            motorcycle:{
                _id: "",
                brand: "",
                model: "",
                color: "",
                license_plate: "",
                price: "",
                date_of_purchase: "",
                status: "",
            },
            menu1: false,
            date: '',
            motorcycleUpdateOldInfo: {},
            motorcycleIDForDelete: "",
        }
    },
    methods:{
        ...mapActions(['getMotorcycles', 'createMotorcycle', 'validateLicensePlate', 'updateMotorcycle', 'softDeleteMotorcycle', 'deleteMotorcycle']),
        initValidations(){

            extend('uniqueLicensePlate', {
                // Create vm property of type (function), because 'extend' no contain vue context (this)
                // NOTE: You don't create (vm: this), this will generate a error ('vue error in mounted hook rangeerror maximum call stack size exceed')
                vm: this.uniqueLicensePlate,
                validate: async function(value) {

                    return {
                        valid: await this.vm(value),
                        data: {
                            error: 'Placa no disponible'
                        }
                    };

                },
                message: `{error}`
            })

        },
        editMotorcycle(item){

            Object.assign(this.motorcycle, item)

            Object.assign(this.motorcycleUpdateOldInfo, this.motorcycle)

            this.dialog = true

        },
        deleteMotorcycleDialog(item){

            this.motorcycleIDForDelete = item._id

            this.deleteDialog = true

        },
        async softDeleteMotorcycleFunc(id){

            try {

                this.$store.commit('showLoading')

                await this.softDeleteMotorcycle(id)

                this.motorcycleIDForDelete = ""

                this.deleteDialog = false

                await this.motorcycles()

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: "success",
                    title: "Hola!",
                    text: "Moto eliminada exitosamente!"
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
        async deleteMotorcycleFunc(id){

            try {

                this.$store.commit('showLoading')

                await this.deleteMotorcycle(id)

                this.motorcycleIDForDelete = ""

                this.deleteDialog = false

                await this.motorcycles()

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: "success",
                    title: "Hola!",
                    text: "Moto eliminada exitosamente!"
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
        async motorcycles() {

            try {

                this.headers = [],
                this.motorcyclesList = [],

                this.$store.commit('showLoading')

                let motorcycles = await this.getMotorcycles()
                
                for(let i = 0; i < motorcycles.length; i++){

                    let record = {}

                    for (const [key, val] of Object.entries(motorcycles[i])) {

                        if(i == 0){
                            if(key != '_id' && key != '__v'){
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

                    this.motorcyclesList.push(record)
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
        async saveMotorcycle(){

            if(this.motorcycle._id == ''){

                try {

                    this.$store.commit('showLoading')

                    const motorcycleResponse = await this.createMotorcycle(this.motorcycle)

                    this.$store.commit('showLoading')

                    await this.motorcycles()

                    this.dialog = false

                    this.initModel()

                    this.$swal.fire({
                        type: 'success',
                        title: 'Hola!',
                        text: `Moto ${motorcycleResponse.license_plate} creada exitosamente!`
                    })

                } catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })

                }

            } else {

                try {

                    this.$store.commit('showLoading')

                    let keys = Object.keys(this.motorcycle).filter(k => this.motorcycle[k] !== this.motorcycleUpdateOldInfo[k]);

                    let info = {}

                    for( let key of keys ){
                        info[key] = this.motorcycle[key]
                    }

                    const motorcycleResponse = await this.updateMotorcycle({id: this.motorcycle._id, info})

                    this.$store.commit('showLoading')                    

                    await this.motorcycles()

                    this.dialog = false

                    this.initModel()

                    this.motorcycleUpdateOldInfo = {}

                    this.$swal.fire({
                        type: 'success',
                        title: 'Hola!',
                        text: `Moto ${motorcycleResponse.license_plate} actualizada exitosamente!`
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
        async uniqueLicensePlate(value){

            try {

                this.$store.commit('showLoading')

                const response = await this.validateLicensePlate(value)

                this.$store.commit('showLoading')

                if(!response) {

                    return true
                }

                if(response && this.motorcycle._id == response._id){

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

            // Motorcycle object
            this.motorcycle._id = ""
            this.motorcycle.brand = ""
            this.motorcycle.model = ""
            this.motorcycle.color = ""
            this.motorcycle.license_plate = ""
            this.motorcycle.price = ""
            this.motorcycle.date_of_purchase = ""
            this.motorcycle.status = ""

        }
        // ...mapMutations(['showLoading'])
    },
    computed:{
        computedDateFormattedMomentjs () {
            return this.motorcycle.date_of_purchase ? moment(this.motorcycle.date_of_purchase ).format('dddd, MMMM Do YYYY') : ''
        }
    }
}
</script>
