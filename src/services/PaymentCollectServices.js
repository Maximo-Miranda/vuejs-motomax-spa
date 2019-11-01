import axios from 'axios'
import GetHeaders from './tools'


// IndexPaymentCollection ...
async function IndexPaymentCollection() {

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/payments/collections`, { headers: GetHeaders() })

        return response.data.data.payment_collections

    } catch (err) {
        throw err
    }

}

// QueryPaymentCollection ...
async function QueryPaymentCollection(filter) {

    try {

        let data = {
            date_from: filter.date_from,
            date_end: filter.date_end
        }

        let response = await axios.post(`${process.env.VUE_APP_API_URL}/payments/collections/find/query?limite=0`, data,{ headers: GetHeaders() })

        return response.data.data.payment_collections

    } catch (err) {
        throw err
    }

}

// StorePaymentCollection ...
async function StorePaymentCollection(paymentCollection) {

    try {

        const data = {

            payment_id: paymentCollection.payment_id,
            motorcycle_id: paymentCollection.motorcycle_id,
            value: paymentCollection.value,
            observation: paymentCollection.observation,
            type_payment_collection: paymentCollection.type_payment_collection,

        }

        let response = await axios.post(`${process.env.VUE_APP_API_URL}/payments/collections`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// UpdatePaymentCollection ...
async function UpdatePaymentCollection(id, paymentCollectionInfoUpdate) {

    try {

        const response = await axios.put(`${process.env.VUE_APP_API_URL}/payments/collections/${id}`, paymentCollectionInfoUpdate, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// SoftDeletePaymentCollection ...
async function SoftDeletePaymentCollection(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/payments/collections/soft/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// DeletePaymentCollection ...
async function DeletePaymentCollection(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/payments/collections/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// GetPaymentCollectionID ...
async function GetPaymentCollectionID() {

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/payments/collections/getid`, { headers: GetHeaders() })

        return response.data.data.id

    } catch (err) {
        throw err
    }

}


export const PaymentCollectionServices = {
    IndexPaymentCollection,
    StorePaymentCollection,
    UpdatePaymentCollection,
    SoftDeletePaymentCollection,
    DeletePaymentCollection,
    GetPaymentCollectionID,
    QueryPaymentCollection,
}