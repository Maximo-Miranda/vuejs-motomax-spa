<template>
    <div>
        <h1>Payment Collection Component</h1>


            <v-footer :fixed=true color="#fafafa" class="pa-0">

                <v-card color="#fafafa" flat width="100%" height="40px">

                        <v-card-text >
                            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
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
                                    <v-card>
                                          <ValidationObserver ref="observer" v-slot="{ invalid, pristine, passes }">
                                            <form @submit.prevent="passes(savePaymentCollection)">

                                                <!-- dialogs buttons -->
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="dialog = false; initModel()">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>{{ paymentCollection._id == '' ? 'Nuevo' : 'Editar' }}</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-toolbar-items>
                                                        <v-btn v-if="paymentCollection._id == ''" dark text :disabled="pristine || invalid" type="submit">Guardar</v-btn>
                                                        <v-btn v-if="paymentCollection._id != ''" dark text :disabled="invalid" type="submit">Guardar</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <!-- end -->

                                                <v-container>
                                                    <!-- value and motorcycle -->
                                                    <v-row>
                                                        <v-col cols="12" xs="12" md="6">
                                                            <p class="title text-center">
                                                                {{ $store.state.paymentStore.payment.title }}
                                                            </p>
                                                            <p class="overline text-center">
                                                                ID: {{ $store.state.paymentStore.payment.id }}
                                                            </p>
                                                        </v-col>
                                                        <v-col cols="12" xs="12" md="6">
                                                            <!--{{ $store.state.paymentStore.payment.id }}-->
                                                            <ValidationProvider name="moto" rules="required" v-slot="{ errors, classes }">
                                                                <v-select
                                                                        :items="motorcycles"
                                                                        item-text="license_plate"
                                                                        item-value="_id"
                                                                        label="Moto"
                                                                        v-model="paymentCollection.motorcycle_id"
                                                                        :error-messages="errors[0]"
                                                                ></v-select>
                                                            </ValidationProvider>
                                                        </v-col>

                                                        <v-col cols="12"  xs="12" md="6">
                                                            <ValidationProvider name="valor" rules="required" v-slot="{ errors, classes }">
                                                                <v-text-field label="Valor"
                                                                              v-model="paymentCollection.value"
                                                                              :error-messages="errors[0]"
                                                                ></v-text-field>
                                                            </ValidationProvider>
                                                        </v-col>

                                                    </v-row>
                                                    <v-row>
                                                        <v-col cols="12" xs="12" md="6">
                                                            <ValidationProvider name="tipo de pago" rules="required" v-slot="{ errors, classes }">
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
                                                            <ValidationProvider name="observación" rules="max:200" v-slot="{ errors, classes }">
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
                                    </v-card>
                            </v-dialog>
                        </v-card-text>
                    <!-- End - Full screen modal -->

                </v-card>

            </v-footer>


    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import moment from 'moment';

    export default {
        name: "PaymentCollectionComponent",
        mounted () {

            this.getAllMotorcycles()
            this.getPaymentsIndex()

        },
        data: () => {
            return {
                dialog: false,
                motorcycles: [],
                payments: [],
                paymentCollection:{
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
            }
        },
        methods: {
            ...mapActions(["getMotorcycles", "createPayment", "getPayments", "updatePayment", "deletePayment", "createPaymentCollection"]),
            async getPaymentsIndex(){

                let result = await this.getPayments()

                this.payments = result

            },
            async getAllMotorcycles(){
                try {

                    this.$store.commit('showLoading')

                    this.motorcycles = await this.getMotorcycles()

                    this.$store.commit('showLoading')

                }catch (err){

                    this.$store.commit('showLoading')

                    this.$swal.fire({
                        type: 'error',
                        title: 'Opps...',
                        text: err
                    })

                }
            },
            async savePaymentCollection(){

                try {

                    this.$store.commit('showLoading')

                    this.paymentCollection.payment_id = this.$store.state.paymentStore.payment.id

                    await this.createPaymentCollection(this.paymentCollection)

                    this.initModel()

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
            async getPaymentID(){
                
                try {

                    if (this.$store.state.paymentStore.payment.id == '') {

                        this.$store.commit('showLoading')

                        const date = moment(new Date() ).format('dddd, MMMM Do YYYY')

                        const payment = await this.createPayment({title: date, status: this.paymentStatus[1].value})

                        this.$store.commit("newPayment", {id: payment._id, title: payment.title, status: payment.status})

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
            initModel(){

                this.paymentCollection.id = ''
                this.paymentCollection.motorcycle_id = ''
                this.paymentCollection.value = ''
                this.paymentCollection.observation = ''
                this.paymentCollection.payment_id = ''
                this.paymentCollection.type_payment_collection = ''

            }
        }
    }
</script>

