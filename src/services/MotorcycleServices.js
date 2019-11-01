import axios from 'axios'
import GetHeaders from './tools'


// IndexMotorcycles ...
async function IndexMotorcycles() {

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/motorcycles?limit=0`, { headers: GetHeaders() })

        return response.data.data.motorcycles

    } catch (err) {
        throw err
    }

}

// StoreMotorcycle ...
async function StoreMotorcycle(motorcycle) {

    try {

        const data = {

            brand: motorcycle.brand,
            model: motorcycle.model,
            color: motorcycle.color,
            license_plate: motorcycle.license_plate,
            price: motorcycle.price,
            date_of_purchase: motorcycle.date_of_purchase,
            url_photo: motorcycle.url_photo,

        }

        let response = await axios.post(`${process.env.VUE_APP_API_URL}/motorcycles`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// GetMotorcycleByID
async function GetMotorcycleByID(id){

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/motorcycle/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// ValidateUniqueBrand ...
async function ValidateUniqueLicensePlate(motorcycleLicensePlate) {

    try {

        const data = {
            license_plate: motorcycleLicensePlate
        }

        const response = await axios.post(`${process.env.VUE_APP_API_URL}/motorcycles/validate/licenseplate`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// UpdateMotorcycle ...
async function UpdateMotorcycle(id, motorcycleInfoUpdate) {

    try {

        const response = await axios.put(`${process.env.VUE_APP_API_URL}/motorcycles/${id}`, motorcycleInfoUpdate, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// SoftDeleteMotorcycle ...
async function SoftDeleteMotorcycle(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/motorcycles/soft/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// DeleteMotorcycle ...
async function DeleteMotorcycle(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/motorcycles/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}


export const MotorcycleServices = {
    IndexMotorcycles,
    StoreMotorcycle,
    ValidateUniqueLicensePlate,
    UpdateMotorcycle,
    SoftDeleteMotorcycle,
    DeleteMotorcycle,
    GetMotorcycleByID,
}