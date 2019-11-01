import axios from 'axios'
import GetHeaders from './tools'


// IndexMaintenances ...
async function IndexMaintenances() {

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/maintenances?limit=0`, { headers: GetHeaders() })

        return response.data.data.maintenances

    } catch (err) {
        throw err
    }

}

// GetMaintenanceByID
async function GetMaintenanceByID(id){

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/maintenance/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// StoreMaintenance ...
async function StoreMaintenance(maintenance) {

    try {

        let response = await axios.post(`${process.env.VUE_APP_API_URL}/maintenances`, maintenance, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// UpdateMaintenance ...
async function UpdateMaintenance(id, paymentInfoUpdate) {

    try {

        const response = await axios.put(`${process.env.VUE_APP_API_URL}/maintenances/${id}`, paymentInfoUpdate, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// SoftDeleteMaintenance ...
async function SoftDeleteMaintenance(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/maintenances/soft/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// DeleteMaintenance ...
async function DeleteMaintenance(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/maintenances/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}


export const MaintenanceServices = {
    IndexMaintenances,
    StoreMaintenance,
    SoftDeleteMaintenance,
    DeleteMaintenance,
    UpdateMaintenance,
    GetMaintenanceByID,
}