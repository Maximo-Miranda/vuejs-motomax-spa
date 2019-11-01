<template>

    <div>
        <v-row>
            <v-col>
                <span class="headline">Pagos</span>
            </v-col>
        </v-row>

        <!-- Payments Datatable -->
        <v-row justify="center">
            <v-col cols="12" xs="12" xl="8">
                <v-card>

                    <v-card-title>
                        <v-container>
                            <v-row justify="end">
                                <v-btn @click="getPaymentsIndex"><v-icon>mdi-cached</v-icon></v-btn>
                            </v-row>
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                                          hide-details></v-text-field>
                        </v-container>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="paymentList" :search="search" class="elevation-2">

                        <template v-slot:item.action="{ item }">

                            <v-icon small class="mr-2" @click="addNewPaymentCollection(item._id)">
                                mdi-plus
                            </v-icon>

                            <v-icon small class="mr-2" @click="editPayment(item)">
                                mdi-pen
                            </v-icon>

                            <v-icon small @click="deletePaymentDialog(item)">
                                mdi-delete
                            </v-icon>

                        </template>

                    </v-data-table>

                </v-card>
            </v-col>
        </v-row>
        <!-- End -->

        <v-footer :fixed=true color="#fafafa" class="pa-0">

            <v-card color="#fafafa" flat width="100%" height="40px">

                <v-card-text>

                    <!-- Add new Payment Collection Dialog -->
                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

                        <!-- Float button -->
                        <template v-slot:activator="{ on }">
                            <v-btn
                                    absolute
                                    dark
                                    fab
                                    top
                                    right
                                    color="primary"
                                    v-on="on"
                                    @click="getPaymentID"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <!-- End float button -->

                        <!-- Form to create a new payment collection -->
                        <v-card>
                            <ValidationObserver ref="observer" v-slot="{ invalid, pristine, passes }">
                                <form @submit.prevent="passes(savePaymentCollection)">

                                    <!-- Payment Collection Dialogs Buttons -->
                                    <v-toolbar dark color="primary">
                                        <v-btn icon dark @click="closePatchPayment">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-toolbar-title>{{ paymentCollection._id == '' ? 'Nuevo' : 'Editar' }}
                                        </v-toolbar-title>
                                        <div class="flex-grow-1"></div>
                                        <v-toolbar-items>
                                            <v-btn v-if="paymentCollection._id == ''" dark text
                                                   :disabled="pristine || invalid" type="submit">Guardar
                                            </v-btn>
                                            <v-btn v-if="paymentCollection._id != ''" dark text :disabled="invalid"
                                                   type="submit">Guardar
                                            </v-btn>
                                        </v-toolbar-items>
                                    </v-toolbar>
                                    <!-- End Payment Collection Dialogs Buttons -->

                                    <v-container>
                                        <!-- value and motorcycle -->
                                        <v-row>
                                            <v-col cols="12" xs="12" md="12">
                                                <p class="title text-center">
                                                    {{ $store.state.paymentStore.payment.title }}
                                                </p>
                                                <p class="overline text-center">
                                                    ID: {{ $store.state.paymentStore.payment.id }}
                                                </p>
                                            </v-col>
                                            <v-col cols="12" xs="12" md="6">
                                                <!--{{ $store.state.paymentStore.payment.id }}-->
                                                <ValidationProvider name="moto" rules="required"
                                                                    v-slot="{ errors, classes }">
                                                    <v-select
                                                            :items="motorcycles"
                                                            item-text="license_plate"
                                                            item-value="_id"
                                                            label="Moto"
                                                            v-model="paymentCollection.motorcycle_id"
                                                            :error-messages="errors[0]"
                                                            @change="changeMotorcyclePhoto"
                                                    ></v-select>
                                                </ValidationProvider>
                                            </v-col>

                                            <v-col cols="12" xs="12" md="6">
                                                <ValidationProvider name="valor" rules="required"
                                                                    v-slot="{ errors, classes }">
                                                    <v-text-field label="Valor"
                                                                  v-model="paymentCollection.value"
                                                                  :error-messages="errors[0]"
                                                    ></v-text-field>
                                                </ValidationProvider>
                                            </v-col>

                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" xs="12" md="6">
                                                <ValidationProvider name="tipo de pago" rules="required"
                                                                    v-slot="{ errors, classes }">
                                                    <v-select
                                                            :items="pytmentCollectionTypes"
                                                            label="Tipo de pago"
                                                            v-model="paymentCollection.type_payment_collection"
                                                            :error-messages="errors[0]"
                                                    ></v-select>
                                                </ValidationProvider>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" xs="12" md="12">
                                                <ValidationProvider name="observación" rules="max:200"
                                                                    v-slot="{ errors, classes }">
                                                    <v-textarea
                                                            name="observacion"
                                                            filled
                                                            label="Obervacion"
                                                            auto-grow
                                                            v-model="paymentCollection.observation"
                                                            :error-messages="errors[0]"
                                                    ></v-textarea>
                                                </ValidationProvider>
                                            </v-col>
                                        </v-row>
                                        <!-- end -->
                                    </v-container>
                                </form>
                            </ValidationObserver>


                            <v-row class="pa-3" v-if="currentMotorcyclePhoto" justify="center">

                                <v-img :src="currentMotorcyclePhoto" max-width="300"  max-height="400"></v-img>

                            </v-row>


                        </v-card>
                        <!-- End Form to create a new payment collection -->

                    </v-dialog>
                    <!-- End new Payment Collection Dialog -->


                </v-card-text>

            </v-card>

        </v-footer>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <!--<v-btn text @click="snack = false">Close</v-btn>-->
        </v-snackbar>

        <!-- Edit payments collections dialog -->
        <v-dialog v-model="dialogEdit" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">

            </template>

            <v-card>
                <ValidationObserver ref="observerEdit" v-slot="{ invalid, pristine, passes }">
                    <form @submit.prevent="passes(patchPayment)">

                        <!-- dialogs buttons -->
                        <v-toolbar dark color="primary">
                            <v-btn icon dark @click="dialogEdit = false; initModel(true)">
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

                            <v-row>
                                <v-col cols="12" xs="12" md="6">
                                    <ValidationProvider name="titulo" rules="required"
                                                        v-slot="{ errors, classes }">
                                        <v-text-field label="title"
                                                      v-model="paymentUpdateInfo.title"
                                                      :error-messages="errors[0]"
                                        ></v-text-field>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12" xs="12" md="6">
                                    <ValidationProvider name="estado" rules="required"
                                                        v-slot="{ errors, classes }">
                                        <v-select
                                                :items="paymentStatus"
                                                label="Estado"
                                                v-model="paymentUpdateInfo.payment_status"
                                                :error-messages="errors[0]"
                                        ></v-select>
                                    </ValidationProvider>
                                </v-col>
                            </v-row>

                            <v-divider></v-divider>

                            <v-row>

                                <v-col cols="12">

                                    <v-card>

                                        <v-card-title>
                                            <v-text-field v-model="searchPaymentCollection"
                                                          append-icon="mdi-magnify" label="Buscar"
                                                          single-line hide-details></v-text-field>
                                        </v-card-title>

                                        <v-data-table :headers="paymentCollectionHeaders"
                                                      :items="paymentCollectionList"
                                                      :search="searchPaymentCollection"
                                                      class="elevation-2">

                                            <template v-slot:item.action="{ item }">

                                                <v-icon small @click="deletePaymentCollectionDialog(item)">
                                                    mdi-delete
                                                </v-icon>

                                            </template>

                                            <template v-slot:item.type_payment_collection="props">

                                                <v-edit-dialog
                                                        :return-value.sync="props.item.type_payment_collection"
                                                        large
                                                        persistent
                                                        @save="patchPaymentCollection(props.item._id, {'type_payment_collection': props.item.type_payment_collection})"
                                                        @cancel="cancelSnack"
                                                        @open="openSnack"
                                                >
                                                    <div>{{ props.item.type_payment_collection }}
                                                    </div>
                                                    <template v-slot:input>
                                                        <div class="mt-4 title">Update Type Payment
                                                            Collection
                                                        </div>
                                                    </template>
                                                    <template v-slot:input>

                                                        <v-select
                                                                :items="pytmentCollectionTypes"
                                                                :rules="[minChars]"
                                                                label="Edit"
                                                                v-model="props.item.type_payment_collection"
                                                        ></v-select>

                                                    </template>
                                                </v-edit-dialog>

                                            </template>
                                            <template v-slot:item.value="props">

                                                <v-edit-dialog
                                                        :return-value.sync="props.item.value"
                                                        large
                                                        persistent
                                                        @save="patchPaymentCollection(props.item._id, {'value': props.item.value})"
                                                        @cancel="cancelSnack"
                                                        @open="openSnack"
                                                >
                                                    <div>{{ props.item.value }}</div>
                                                    <template v-slot:input>
                                                        <div class="mt-4 title">Update Value</div>
                                                    </template>
                                                    <template v-slot:input>

                                                        <v-text-field
                                                                v-model="props.item.value"
                                                                :rules="[minChars]"
                                                                label="Edit"
                                                                autofocus
                                                        ></v-text-field>

                                                    </template>
                                                </v-edit-dialog>

                                            </template>
                                            <template v-slot:item.observation="props">

                                                <v-edit-dialog
                                                        :return-value.sync="props.item.observation"
                                                        large
                                                        persistent
                                                        @save="patchPaymentCollection(props.item._id, {'observation': props.item.observation})"
                                                        @cancel="cancelSnack"
                                                        @open="openSnack"
                                                >
                                                    <div>{{ props.item.observation }}</div>
                                                    <template v-slot:input>
                                                        <div class="mt-4 title">Update Observation
                                                        </div>
                                                    </template>
                                                    <template v-slot:input>

                                                        <v-text-field
                                                                v-model="props.item.observation"
                                                                :rules="[minChars]"
                                                                label="Edit"
                                                                autofocus
                                                        ></v-text-field>

                                                    </template>
                                                </v-edit-dialog>

                                            </template>
                                            <template v-slot:item.date="props">

                                                <v-edit-dialog
                                                        :return-value.sync="props.item.date"
                                                        large
                                                        persistent
                                                        @save="patchPaymentCollection(props.item._id, {'date': props.item.date})"
                                                        @cancel="cancelSnack"
                                                        @open="openSnack"
                                                >
                                                    <div>{{ props.item.date }}</div>
                                                    <template v-slot:input>
                                                        <div class="mt-4 title">Update Date</div>
                                                    </template>
                                                    <template v-slot:input>

                                                        <v-text-field
                                                                v-model="props.item.date"
                                                                :rules="[minChars]"
                                                                label="Edit"
                                                                autofocus
                                                        ></v-text-field>

                                                    </template>
                                                </v-edit-dialog>

                                            </template>

                                        </v-data-table>

                                    </v-card>

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

                    <v-btn color="green darken-1" text @click="softDeletePaymentFunc(paymentIDForDelete)">
                        Logico
                    </v-btn>

                    <v-btn color="green darken-1" text @click="deletePaymentFunc(paymentIDForDelete)">
                        Fisico
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- end -->

        <!-- delete payment collection dialog -->
        <v-dialog v-model="deletePaymentCollDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">
                    Ests segur@ de realizar esta accion?
                </v-card-title>

                <v-card-text>
                    Los cambios no se podran revertir!
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>

                    <v-btn color="green darken-1" text @click="softDeletePaymentCollectionFunc(paymentCollectionIDForDelete)">
                        Logico
                    </v-btn>

                    <v-btn color="green darken-1" text @click="deletePaymentCollectionFunc(paymentCollectionIDForDelete)">
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
    import moment from 'moment';

    export default {
        name: "PaymentCollectionComponent",
        mounted() {

            this.getAllMotorcycles()
            this.getPaymentsIndex()

        },
        data: () => {
            return {
                search: '',
                searchPaymentCollection: '',
                snack: false,
                snackColor: '',
                snackText: '',
                dialogEdit: false,
                dialog: false,
                motorcycles: [],
                paymentList: [],
                headers: [],
                paymentCollectionHeaders: [],
                paymentCollectionList: [],
                deleteDialog: false,
                deletePaymentCollDialog: false,
                minChars: v => v.length > 0 || 'Data required',
                paymentCollection: {
                    id: '',
                    motorcycle_id: '',
                    value: '',
                    observation: '',
                    payment_id: '',
                    type_payment_collection: '',
                },
                pytmentCollectionTypes: [
                    {text: "-- Select type --", value: ""},
                    {text: "Pago", value: "PAYMENT"},
                    {text: "Avance", value: "ADVENCEMENT"},
                    {text: "Pago Pendiente", value: "DEBT"},
                ],
                paymentStatus: [
                    {text: "-- Select type --", value: ""},
                    {text: "Open", value: "PAYMENT_OPEN"},
                    {text: "Close", value: "PAYMENT_CLOSE"},
                    {text: "Pending", value: "PENDING_PAYMENTS"},
                ],
                paymentUpdateOldInfo: {
                    id: '',
                    title: '',
                    status: ''
                },
                paymentUpdateInfo: {
                    id: '',
                    title: '',
                    payment_status: ''
                },
                paymentIDForDelete: '',
                paymentCollectionIDForDelete: '',
                currentMotorcyclePhoto: '',
            }
        },
        methods: {
            ...mapActions([
                "getMotorcycles",
                "createPayment",
                "getPayments",
                "updatePayment",
                "deletePayment",
                "softDeletePayment",
                "createPaymentCollection",
                "getPaymentByID",
                "updatePaymentCollection",
                "softDeletePaymentCollection",
                "deletePaymentCollection"
            ]),
            // Payment Methods
            async getPaymentsIndex() {

                try {

                    this.headers = []
                    this.paymentList = []

                    this.$store.commit('showLoading')

                    let payments = await this.getPayments()

                    for (let i = 0; i < payments.length; i++) {

                        let record = {}

                        for (const [key, val] of Object.entries(payments[i])) {

                            if (i == 0) {
                                if (key != '_id' && key != '__v') {
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

                        this.paymentList.push(record)
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
            async getPaymentID() {

                try {

                    if (this.$store.state.paymentStore.payment.id == '') {

                        this.$store.commit('showLoading')

                        const date = moment(new Date()).format('dddd, MMMM Do YYYY')

                        const payment = await this.createPayment({
                            title: date,
                            payment_status: this.paymentStatus[1].value
                        })

                        this.$store.commit("newPayment", {
                            id: payment._id,
                            title: payment.title,
                            payment_status: payment.payment_status
                        })

                        this.$store.commit('showLoading')

                    }

                } catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })
                }

            },
            async editPayment(item) {

                try {

                    this.paymentCollectionHeaders = []

                    this.paymentCollectionList = []

                    let payment = await this.getPaymentByID({id: item._id})

                    this.$store.commit("newPayment", {
                        id: payment.paymentDB._id,
                        title: payment.paymentDB.status,
                        payment_status: payment.paymentDB.payment_status,
                    })

                    Object.assign(this.paymentUpdateInfo, payment.paymentDB)

                    let payments = payment.payments_collections

                    for (let i = 0; i < payments.length; i++) {

                        let record = {}

                        for (const [key, val] of Object.entries(payments[i])) {

                            if (i == 0) {
                                if (key != '_id' && key != '__v' && key != 'payment') {
                                    this.paymentCollectionHeaders.push({
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

                        this.paymentCollectionList.push(record)
                    }

                    this.paymentCollectionHeaders.push({ text: 'Opciones', value: 'action', sortable: false },)

                    Object.assign(this.paymentUpdateOldInfo, payment.paymentDB)

                    this.dialogEdit = true

                } catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })

                }

            },
            async patchPayment() {

                try {

                    this.$store.commit('showLoading')

                    let keys = Object.keys(this.paymentUpdateInfo).filter(k => this.paymentUpdateInfo[k] !== this.paymentUpdateOldInfo[k]);

                    let info = {}

                    for (let key of keys) {
                        info[key] = this.paymentUpdateInfo[key]
                    }

                    await this.updatePayment({id: this.paymentUpdateInfo._id, info})

                    this.dialogEdit = false

                    this.$store.commit('showLoading')

                    this.getPaymentsIndex()

                } catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })


                }

            },
            async softDeletePaymentFunc(id){

                try {

                    this.$store.commit('showLoading')

                    await this.softDeletePayment(id)

                    this.paymentIDForDelete = ""

                    this.deleteDialog = false

                    await this.getPaymentsIndex()

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: "success",
                        title: "Hola!",
                        text: "Pago eliminado exitosamente!"
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
            async deletePaymentFunc(id){

                try {

                    this.$store.commit('showLoading')

                    await this.deletePayment(id)

                    this.paymentIDForDelete = ""

                    this.deleteDialog = false

                    await this.getPaymentsIndex()

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: "success",
                        title: "Hola!",
                        text: "Pago eliminado exitosamente!"
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
            deletePaymentDialog(item) {

                this.paymentIDForDelete = item._id

                this.deleteDialog = true

            },
            closePatchPayment(){

                this.dialog = false

                this.initModel(true)

                this.getPaymentsIndex()
            },
            // End Payment Methods

            // Motorcycle Method
            async getAllMotorcycles() {
                try {

                    this.$store.commit('showLoading')

                    this.motorcycles = await this.getMotorcycles()

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
            changeMotorcyclePhoto() {

                let motorcycleFileter = this.motorcycles.find((motorcycle) => motorcycle._id == this.paymentCollection.motorcycle_id)
                this.currentMotorcyclePhoto = `${process.env.VUE_APP_STORAGE_URL}/${motorcycleFileter.url_photo}`
            },
            // End Motorcycle Method

            // Payment Collection Methods
            async savePaymentCollection() {

                try {

                    this.$store.commit('showLoading')

                    this.paymentCollection.payment_id = this.$store.state.paymentStore.payment.id

                    await this.createPaymentCollection(this.paymentCollection)

                    this.initModel(false)

                    // You should call it on the next frame
                    requestAnimationFrame(() => {
                        this.$refs.observer.reset();
                    });

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
            async patchPaymentCollection(id, dataToUpdate) {

                try {

                    this.$store.commit('showLoading')

                    await this.updatePaymentCollection({id, info: dataToUpdate})

                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Data updated'

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
            async softDeletePaymentCollectionFunc(id){

                try {

                    this.$store.commit('showLoading')

                    await this.softDeletePaymentCollection(id)

                    this.paymentCollectionIDForDelete = ""

                    this.deletePaymentCollDialog = false

                    // await this.getPaymentsIndex()

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: "success",
                        title: "Hola!",
                        text: "Pago eliminado exitosamente!"
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
            async deletePaymentCollectionFunc(id){

                try {

                    this.$store.commit('showLoading')

                    await this.deletePaymentCollection(id)

                    this.paymentCollectionIDForDelete = ""

                    this.deletePaymentCollDialog = false

                    await this.editPayment({_id: this.$store.state.paymentStore.payment.id})

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: "success",
                        title: "Hola!",
                        text: "Pago eliminado exitosamente!"
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
            async addNewPaymentCollection(paymentID){

                try {


                    this.$store.commit('showLoading')


                    const payment = await this.getPaymentByID({id: paymentID})

                    this.$store.commit("newPayment", {
                          id: payment.paymentDB._id,
                          title: payment.paymentDB.title,
                          payment_status: payment.paymentDB.payment_status
                    })

                    this.$store.commit('showLoading')

                    this.dialog = true


                } catch (err) {

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })
                }

            },
            deletePaymentCollectionDialog(item){

                this.paymentCollectionIDForDelete = item._id

                this.deletePaymentCollDialog = true

            },
            // End Payment Collection Methods

            // Snack Methods
            cancelSnack() {

                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Canceled'

            },
            openSnack() {

                this.snack = true
                this.snackColor = 'info'
                this.snackText = 'Dialog opened'

            },
            // End Snack Methods

            // General Methods
            initModel(initMutation) {

                this.paymentCollection.id = ''
                this.paymentCollection.motorcycle_id = ''
                this.paymentCollection.value = ''
                this.paymentCollection.observation = ''
                this.paymentCollection.payment_id = ''
                this.paymentCollection.type_payment_collection = ''

                if(initMutation) {
                    this.$store.commit("newPayment", {
                        id: '',
                        title: '',
                        payment_status: ''
                    })
                }

            }
            // End General Methods
        }
    }
</script>

