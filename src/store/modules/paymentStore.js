import { PaymentServices } from '@/services/PaymentServices'

export const paymentStore = {
    state: {
        payment: {
            id: '',
            title: '',
            status: ''
        }
    },
    getters: {},
    mutations: {
        newPayment: (state, payment) => {
            state.payment = payment
        }
    },
    actions: {
        getPayments: async() => {

            try {

                const paymentCollections = await PaymentServices.IndexPayment()

                return paymentCollections

            } catch (err) {
                throw err
            }

        },
        createPayment: async(context, data) => {

            try {

                const payment = await PaymentServices.StorePayment(data)

                return payment

            } catch (err) {
                throw err
            }

        },
        updatePayment: async(context, data) => {

            try {

                const paymentUpdated = await PaymentServices.UpdatePayment(data.id, data.info)

                return paymentUpdated

            } catch (err) {
                throw err
            }

        },
        softDeletePayment: async(context, id) => {

            try {

                const paymentDeleted = await PaymentServices.SoftDeletePayment(id)

                return paymentDeleted

            } catch (err) {
                throw err
            }

        },
        deletePayment: async(context, id) => {

            try {

                const paymentDeleted = await PaymentServices.DeletePayment(id)

                return paymentDeleted

            } catch (err) {
                throw err
            }

        },
    }
}