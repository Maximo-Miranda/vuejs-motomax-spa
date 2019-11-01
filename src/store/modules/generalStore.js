import { GeneralServices } from '@/services/GeneralServices'

export const generalStore = {
    state: {
        loading: false
    },
    mutations: {
        showLoading: (state) => {
            state.loading = !state.loading
        }
    },
    actions: {
        createImage: async (context, data) => {

            try {

                const image = await GeneralServices.StoreImage(data)

                return image

            } catch (err) {
                throw err
            }

        },
        getImage: async (context, data) => {

            try {

                const image = await GeneralServices.GetImage(data)

                return image

            } catch (err) {
                throw err
            }

        },
        deleteImage: async (context, data) => {

            try {

                const image = await GeneralServices.DeleteImage(data)

                return image

            } catch (err) {
                throw err
            }

        },
    }
}