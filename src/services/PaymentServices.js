import axios from 'axios'
import GetHeaders from './tools'


// IndexPayment ...
async function IndexPayment() {

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/payments?limit=0`, { headers: GetHeaders() })

        return response.data.data.payments

    } catch (err) {
        throw err
    }

}

// StorePayment ...
async function StorePayment(payment) {

    try {

        const data = {

            title: payment.title,
            payment_status: payment.status,

        }

        let response = await axios.post(`${process.env.VUE_APP_API_URL}/payments`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// UpdatePayment ...
async function UpdatePayment(id, paymentInfoUpdate) {

    try {

        const response = await axios.put(`${process.env.VUE_APP_API_URL}/payments/${id}`, paymentInfoUpdate, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// SoftDeletePayment ...
async function SoftDeletePayment(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/payments/soft/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// DeletePayment ...
async function DeletePayment(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/payments/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}


export const PaymentServices = {
    IndexPayment,
    StorePayment,
    UpdatePayment,
    SoftDeletePayment,
    DeletePayment,
}