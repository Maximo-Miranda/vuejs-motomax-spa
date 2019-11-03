
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

                                        <ValidationObserver ref="observer" v-slot="{ invalid, pristine, passes }">
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
                                                <v-row class="pa-3" v-if="motorcycle._id" justify="center">

                                                    <v-img :src="image" max-width="400"  max-height="400"></v-img>

                                                </v-row>

                                                <div class="pa-4" v-if="motorcycle._id" justify="center">
                                                    <v-divider></v-divider>
                                                </div>
                                                <v-expansion-panels>

                                                    <v-expansion-panel>
                                                                    <v-expansion-panel-header>
                                                                        Information
                                                                        <template v-slot:actions>
                                                                            <v-icon color="primary">mdi-plus</v-icon>
                                                                        </template>
                                                                    </v-expansion-panel-header>
                                                                    <v-expansion-panel-content>

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
                                                                        <!-- motorcycle image -->
                                                                        <v-row>
                                                                            <v-col cols="12" xs="12" md="12">
                                                                                <ValidationProvider name="tipo" rules="image"
                                                                                                    v-slot="{ errors, classes, validate }">
                                                                                    <v-file-input
                                                                                            type="file"
                                                                                            ref="myfile"
                                                                                            v-model="motorcycle.photos"
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
                                                                        <!-- end -->

                                                                    </v-container>
                                                                    </v-expansion-panel-content>
                                                                </v-expansion-panel>

                                                    <v-expansion-panel>

                                                            <v-expansion-panel-header disable-icon-rotate>
                                                                Statistics
                                                                <template v-slot:actions>
                                                                    <v-icon color="teal">mdi-check</v-icon>
                                                                </template>
                                                            </v-expansion-panel-header>
                                                            <v-expansion-panel-content>

                                                                <v-row>
                                                                    <v-col cols="12"  xs="12" md="12">
                                                                        <p class="title">Consulta ingresos por rango de fecha: $ {{ valueByMonth }}</p>
                                                                    </v-col>
                                                                    <v-col cols="12"  xs="12" md="5">

                                                                        <!-- <v-text-field label="Fecha de compra"
                                                                            v-model="motorcycle.date_of_purchase"
                                                                            :error-messages="errors[0]"
                                                                        ></v-text-field> -->

                                                                        <v-menu
                                                                                v-model="menu2"
                                                                                :close-on-content-click="false"
                                                                                transition="scale-transition"
                                                                                offset-y
                                                                                full-width
                                                                                max-width="290px"
                                                                                min-width="290px"
                                                                        >
                                                                            <template v-slot:activator="{ on }">

                                                                                <v-text-field
                                                                                        :value="computedDateFormattedMomentjsFrom"
                                                                                        label="Fecha de inicio"
                                                                                        persistent-hint
                                                                                        prepend-icon="mdi-calendar-month"
                                                                                        v-on="on"
                                                                                ></v-text-field>

                                                                            </template>

                                                                            <v-date-picker v-model="date_from" no-title @input="menu2 = false"></v-date-picker>

                                                                        </v-menu>

                                                                    </v-col>
                                                                    <v-col cols="12"  xs="12" md="5">

                                                                        <!-- <v-text-field label="Fecha de compra"
                                                                            v-model="motorcycle.date_of_purchase"
                                                                            :error-messages="errors[0]"
                                                                        ></v-text-field> -->

                                                                        <v-menu
                                                                                v-model="menu3"
                                                                                :close-on-content-click="false"
                                                                                transition="scale-transition"
                                                                                offset-y
                                                                                full-width
                                                                                max-width="290px"
                                                                                min-width="290px"
                                                                        >
                                                                            <template v-slot:activator="{ on }">

                                                                                <v-text-field
                                                                                        :value="computedDateFormattedMomentjsEnd"
                                                                                        label="Fecha de fin"
                                                                                        persistent-hint
                                                                                        prepend-icon="mdi-calendar-month"
                                                                                        v-on="on"
                                                                                ></v-text-field>

                                                                            </template>

                                                                            <v-date-picker v-model="date_end" no-title @input="menu3 = false"></v-date-picker>

                                                                        </v-menu>

                                                                    </v-col>
                                                                    <v-col cols="12"  xs="12" md="2">
                                                                        <v-btn color="primary" @click="getPaymentsCollectionByDate" :loading="btnLoading" type="button">Consultar</v-btn>
                                                                    </v-col>
                                                                </v-row>

                                                                <v-divider></v-divider>
                                                                <v-col cols="12"  xs="12" md="12">
                                                                    <p class="title">Grafica Inversión vs Retorno</p>
                                                                </v-col>
                                                                <line-chart :chart-data="datacollection" :options="optionsDataConnecion" :height="100"></line-chart>
                                                                <v-divider></v-divider>
                                                                <v-col cols="12"  xs="12" md="12">
                                                                    <p class="title">Grafica Ingresos y Egresos por tipo</p>
                                                                </v-col>
                                                                <line-chart :chart-data="datacollectionGeneral" :height="100"></line-chart>
                                                            </v-expansion-panel-content>
                                                        </v-expansion-panel>

                                                </v-expansion-panels>

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

import LineChart from './shared/charts/BarChart.js'

export default {
    components: {
        LineChart
    },
    mounted () {

        this.motorcycle.date_of_purchase = new Date().toISOString().substr(0, 10)
        this.date_from = new Date().toISOString().substr(0, 10)
        this.date_end = new Date().toISOString().substr(0, 10)

        this.motorcycles()
        this.initValidations()


    },
    data() {
        return {
            datacollection: {},
            optionsDataConnecion: {
                responsive: true
            },
            datacollectionGeneral: {},

            search: '',
            headers: [],
            motorcyclesList: [],
            dialog: false,
            deleteDialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            rules: [
                value => !value || value.size < 1000000 || 'Image size should be less than 1 MB!',
            ],
            motorcycle:{
                _id: "",
                brand: "",
                model: "",
                color: "",
                license_plate: "",
                price: "",
                date_of_purchase: "",
                status: "",
                url_photo: "",
                photos: null
            },
            menu1: false,
            menu2: false,
            menu3: false,
            date: "",
            motorcycleUpdateOldInfo: {},
            motorcycleIDForDelete: "",
            image: "",

            chartdata: {
                labels: ['January', 'February'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            motorcycleForStatics: {},
            date_from: "",
            date_end: "",
            valueByMonth: 0,
            btnLoading: false,
        }
    },
    methods:{
        ...mapActions([
            'getMotorcycles',
            'createMotorcycle',
            'validateLicensePlate',
            'updateMotorcycle',
            'softDeleteMotorcycle',
            'deleteMotorcycle',
            "createImage",
            "deleteImage",
            "getMotorcycleByID",
            "queryPaymentCollections",
        ]),
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
        async editMotorcycle(item){

            Object.assign(this.motorcycle, item)

            this.motorcycleForStatics = await this.getMotorcycleByID({id: item._id})

            this.fillData()

            this.motorcycle.url_photo = this.motorcycleForStatics.motorcycleDB.url_photo

            this.image = `${process.env.VUE_APP_STORAGE_URL}/${this.motorcycleForStatics.motorcycleDB.url_photo}`

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

                const motorcycle = await this.getMotorcycleByID({id})

                console.log("motorcycle", motorcycle)

                if (motorcycle._id != '') {

                    await this.deleteImage({api_key: process.env.VUE_APP_STORAGE_KEY, pathfile: motorcycle.url_photo})

                }

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

                this.headers = []
                this.motorcyclesList = []

                this.$store.commit('showLoading')

                let motorcycles = await this.getMotorcycles()
                
                for(let i = 0; i < motorcycles.length; i++){

                    let record = {}

                    for (const [key, val] of Object.entries(motorcycles[i])) {

                        if(i == 0){
                            if(key != '_id' && key != '__v' && key != 'url_photo'){
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

                this.headers.push({ text: 'Opciones', value: 'action', sortable: false })

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
        async saveMotorcycle(){

            let formDataStorage = new FormData();

            if(this.motorcycle._id == ''){

                try {

                    this.dialog = false

                    this.$store.commit('showLoading')

                    this.motorcycle.url_photo = '/storate/no-image'

                    if (this.motorcycle.photos) {

                        formDataStorage.append("photo", this.motorcycle.photos)
                        formDataStorage.append("api_key", process.env.VUE_APP_STORAGE_KEY)

                        this.motorcycle.url_photo = await this.createImage(formDataStorage)

                    }

                    const motorcycleResponse = await this.createMotorcycle(this.motorcycle)

                    // You should call it on the next frame
                    requestAnimationFrame(() => {
                        this.$refs.observer.reset();
                    });

                    this.$store.commit('showLoading')

                    await this.motorcycles()

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

                    this.dialog = false

                    this.$store.commit('showLoading')

                    let keys = Object.keys(this.motorcycle).filter(k => this.motorcycle[k] !== this.motorcycleUpdateOldInfo[k]);

                    let info = {}

                    for( let key of keys ){
                        info[key] = this.motorcycle[key]
                    }

                    if (this.motorcycle.photos) {


                        formDataStorage.append("photo", this.motorcycle.photos)
                        formDataStorage.append("api_key", process.env.VUE_APP_STORAGE_KEY)

                        info.url_photo = await this.createImage(formDataStorage)

                        if (this.motorcycle._id != '') {

                            await this.deleteImage({api_key: process.env.VUE_APP_STORAGE_KEY, pathfile: this.motorcycle.url_photo})

                        }

                    }


                    const motorcycleResponse = await this.updateMotorcycle({id: this.motorcycle._id, info})

                    this.$store.commit('showLoading')                    

                    await this.motorcycles()

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
            this.motorcycle.photos = null
            this.motorcycle.date_of_purchase = ""
            this.motorcycle.status = ""
            this.motorcycle.url_photo =  ""

        },
        // ...mapMutations(['showLoading'])

        fillData () {

            // console.log(this.motorcycleForStatics)

            let payments = 0

            let PRICE = this.motorcycleForStatics.motorcycleDB.price
            let PAYMENT = 0
            let DEBT = 0
            let ADVENCEMENT = 0
            let MAINTEN = 0


            for (let pay of this.motorcycleForStatics.payments_collections){
                if (pay.type_payment_collection == "PAYMENT") {
                    payments += Number(pay.value)
                    PAYMENT += Number(pay.value)
                }

                if (pay.type_payment_collection == "ADVENCEMENT") {
                    payments += Number(pay.value)
                    ADVENCEMENT += Number(pay.value)
                }

                if (pay.type_payment_collection == "DEBT") {
                    DEBT += Number(pay.value)
                }
            }


            let maintenances = this.motorcycleForStatics.motorcycleDB.price


            for (let man of this.motorcycleForStatics.maintenances){
                maintenances += Number(man.value)
                MAINTEN += Number(man.value)
            }

            this.datacollection = {
                labels: ["Inversión", "Retorno"],
                datasets: [
                    {
                        label: 'Balance',
                        backgroundColor: ['#FF0066', '#008f39'],
                        data: [maintenances, payments]
                    }
                ]
            }


            this.datacollectionGeneral = {
                labels: ["Precio", "Pagos", "Pago Pendiente", "Mantenimientos e inversion", "Avances"],
                datasets: [
                    {
                        label: 'General',
                        backgroundColor: ['#FF0066', '#008f39'],
                        data: [PRICE, PAYMENT, DEBT, MAINTEN, ADVENCEMENT]
                    }
                ]

            }
        },
        async getPaymentsCollectionByDate () {

            try{

                this.btnLoading = true

                this.valueByMonth = 0

                this.$store.commit('showLoading')

                const paymentsColletions = await this.queryPaymentCollections({date_from: this.date_from, date_end: this.date_end})

                for(let val of paymentsColletions) {
                    this.valueByMonth += Number(val.value)
                }

                this.btnLoading = false

                this.$store.commit('showLoading')

            }catch (err) {

                this.btnLoading = false

                this.$store.commit('showLoading')

                this.$swal.fire({
                    type: 'error',
                    title: 'Opps...',
                    text: err
                })

            }

        },
    },
    computed:{
        computedDateFormattedMomentjs () {
            return this.motorcycle.date_of_purchase ? moment(this.motorcycle.date_of_purchase ).format('dddd, MMMM Do YYYY') : ''
        },
        computedDateFormattedMomentjsFrom () {
            return this.date_from ? moment(this.date_from ).format('dddd, MMMM Do YYYY') : ''
        },
        computedDateFormattedMomentjsEnd () {
            return this.date_end ? moment(this.date_end ).format('dddd, MMMM Do YYYY') : ''
        }
    }
}
</script>
