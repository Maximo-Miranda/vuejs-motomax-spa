import { UserServices } from '@/services/UserServices'
let jwt_decode = require('jwt-decode')

export const userStore = {
    state: {
        user: {
            id: '',
            name: '',
            lastname: '',
            identification: '',
            role: '',
            img: '',
            token: '',
            isAuth: false
        }
    },
    getters: {
        validateAuth: (state) => {
            if (!state.user.isAuth) {
                if (localStorage.getItem('motomax_token')) {
                    return true
                }
                return false
            }
        }
    },
    mutations: {
        userSingIn: (state, user) => {
            state.user = user
        },
        userLogout: (state) => {

            state.user.id = ''
            state.user.name = ''
            state.user.lastname = ''
            state.user.identification = ''
            state.user.role = ''
            state.user.img = ''
            state.user.token = ''
            state.user.isAuth = false

            localStorage.removeItem("motomax_token")
        }
    },
    actions: {
        login: async({ commit }, account) => {

            try {

                let userLoged = await UserServices.ValidateAccount(account)

                userLoged.isAuth = true

                commit('userSingIn', userLoged)

            } catch (err) {
                throw err
            }

        },
        getClaims: ({ commit }) => {

            try {

                const claims = jwt_decode(localStorage.getItem('motomax_token'))

                claims.isAuth = true
                claims.token = localStorage.getItem('motomax_token')

                commit('userSingIn', claims)

            } catch (err) {

                localStorage.removeItem('motomax_token')
                throw err
            }

        },
        getUsers: async() => {

            try {

                const users = await UserServices.IndexUsers()

                return users

            } catch (err) {
                throw err
            }

        },
        createUser: async(context, data) => {

            try {

                const user = await UserServices.StoreUser(data)

                return user

            } catch (err) {
                throw err
            }

        },
        validateIndentification: async(context, data) => {

            try {

                const response = await UserServices.ValidateUniqueIdentification(data)

                return response

            } catch (err) {
                throw err
            }

        },
        updateUser: async(context, data) => {

            try {

                const userUpdated = await UserServices.UpdateUser(data.id, data.info)

                return userUpdated

            } catch (err) {
                throw err
            }

        },
        softDeleteUser: async(context, id) => {

            try {

                const userDeleted = await UserServices.SoftDeleteUser(id)

                return userDeleted

            } catch (err) {
                throw err
            }

        },
        deleteUser: async(context, id) => {

            try {

                const userDeleted = await UserServices.DeleteUser(id)

                return userDeleted

            } catch (err) {
                throw err
            }

        }
    }
}