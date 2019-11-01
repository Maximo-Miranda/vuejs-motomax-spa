import axios from 'axios'
import GetHeaders from './tools'


// GetImage ...
async function GetImage(pathFile){

    try {

        let response = await axios.get(`${process.env.VUE_APP_STORAGE_URL}/motomax/${pathFile}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// StoreImage ...
async function StoreImage(data) {

    try {

        let response = await axios.post(`${process.env.VUE_APP_STORAGE_URL}/motomax/storage/upload`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// DeleteImage ...
async function DeleteImage(data) {

    try {

        let response = await axios.post(`${process.env.VUE_APP_STORAGE_URL}/motomax/storage/delete`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }


}


export const GeneralServices = {
    GetImage,
    StoreImage,
    DeleteImage,
}