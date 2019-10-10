import { PaymentCollectionServices } from '@/services/PaymentCollectServices'

export const paymentCollectionStore = {
    state: {
        paymentCollection: {
            payment_collection_id: '',
            motorcycle_id: '',
            value: '',
            observation: '',
            type_payment_collection: '',
        }
    },
    getters: {},
    mutations: {
        newPaymentCollection: (state, paymentCollection) => {
            state.paymentCollection = paymentCollection
        }
    },
    actions: {
        getPaymentCollections: async() => {

            try {

                const paymentCollections = await PaymentCollectionServices.IndexPaymentCollection()

                return paymentCollections

            } catch (err) {
                throw err
            }

        },
        createPaymentCollection: async(context, data) => {

            try {

                const paymentCollection = await PaymentCollectionServices.StorePaymentCollection(data)

                return paymentCollection

            } catch (err) {
                throw err
            }

        },
        updatePaymentCollection: async(context, data) => {

            try {

                const userUpdated = await PaymentCollectionServices.UpdatePaymentCollection(data.id, data.info)

                return userUpdated

            } catch (err) {
                throw err
            }

        },
        softDeletePaymentCollection: async(context, id) => {

            try {

                const userDeleted = await PaymentCollectionServices.SoftDeletePaymentCollection(id)

                return userDeleted

            } catch (err) {
                throw err
            }

        },
        deletePaymentCollection: async(context, id) => {

            try {

                const userDeleted = await PaymentCollectionServices.DeletePaymentCollection(id)

                return userDeleted

            } catch (err) {
                throw err
            }

        },
        newPaymentCollectionID: async() => {

            try {

                const uuid = await PaymentCollectionServices.GetPaymentCollectionID()

                return uuid

            } catch (err) {
                throw err
            }

        }
    }
}