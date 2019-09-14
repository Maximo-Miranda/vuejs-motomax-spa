import { MotorcycleServices } from '@/services/MotorcycleServices'

export const motorcycleStore = {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        getMotorcycles: async() => {

            try {

                const motorcycles = await MotorcycleServices.IndexMotorcycles()

                return motorcycles

            } catch (err) {
                throw err
            }

        },
        createMotorcycle: async(context, data) => {

            try {

                const motorcycle = await MotorcycleServices.StoreMotorcycle(data)

                return motorcycle

            } catch (err) {
                throw err
            }

        },
        validateLicensePlate: async(context, data) => {

            try {

                const response = await MotorcycleServices.ValidateUniqueLicensePlate(data)

                return response

            } catch (err) {
                throw err
            }

        },
        updateMotorcycle: async(context, data) => {

            try {

                const motorcycleUpdated = await MotorcycleServices.UpdateMotorcycle(data.id, data.info)

                return motorcycleUpdated

            } catch (err) {
                throw err
            }

        },
        softDeleteMotorcycle: async(context, id) => {

            try {

                const motorcycleDeleted = await MotorcycleServices.SoftDeleteMotorcycle(id)

                return motorcycleDeleted

            } catch (err) {
                throw err
            }

        },
        deleteMotorcycle: async(context, id) => {

            try {

                const motorcycleDeleted = await MotorcycleServices.DeleteMotorcycle(id)

                return motorcycleDeleted

            } catch (err) {
                throw err
            }

        }
    }
}