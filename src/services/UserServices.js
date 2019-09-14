import axios from 'axios'
import GetHeaders from './tools.js'

// ValidateAccount ...
async function ValidateAccount(account) {

    try {

        const data = {
            identification: account.identification,
            password: account.password
        }

        let response = await axios.post(`${process.env.VUE_APP_API_URL}/login`, data, { headers: { 'Content-Type': 'application/json' } })

        const dataResponse = response.data.data

        return {
            id: dataResponse.user._id,
            name: dataResponse.user.name,
            lastname: dataResponse.user.lastname,
            identification: dataResponse.user.identification,
            role: dataResponse.user.role,
            img: dataResponse.user.img,
            token: `Bearer ${dataResponse.token}`
        }

    } catch (err) {
        throw err
    }

}

// IndexUsers ...
async function IndexUsers() {

    try {

        let response = await axios.get(`${process.env.VUE_APP_API_URL}/users`, { headers: GetHeaders() })

        return response.data.data.users

    } catch (err) {
        throw err
    }

}

// StoreUser ...
async function StoreUser(user) {

    try {

        const data = {
            name: user.name,
            lastname: user.lastname,
            img: user.img,
            nacionality: user.nacionality,
            identification: user.identification,
            type_identification: user.type_identification,
            phonenumber: user.phonenumber,
            password: user.password,
            role: user.role
        }


        let response = await axios.post(`${process.env.VUE_APP_API_URL}/users`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// ValidateUniqueIdentification ...
async function ValidateUniqueIdentification(userIdentification) {

    try {

        const data = {
            identification: userIdentification
        }

        const response = await axios.post(`${process.env.VUE_APP_API_URL}/users/validate/identification`, data, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// UpdateUser ...
async function UpdateUser(id, userInfoUpdate) {

    try {

        const response = await axios.put(`${process.env.VUE_APP_API_URL}/users/${id}`, userInfoUpdate, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// SoftDeleteUser ...
async function SoftDeleteUser(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/users/soft/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}

// DeleteUser ...
async function DeleteUser(id) {

    try {

        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/users/${id}`, { headers: GetHeaders() })

        return response.data.data

    } catch (err) {
        throw err
    }

}


export const UserServices = {
    ValidateAccount,
    IndexUsers,
    StoreUser,
    ValidateUniqueIdentification,
    UpdateUser,
    SoftDeleteUser,
    DeleteUser,
}