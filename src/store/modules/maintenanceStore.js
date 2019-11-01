import { MaintenanceServices } from '@/services/MaintenanceServices'

export const maintenanceStore = {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        getMaintenances: async() => {

            try {

                const maintenances = await MaintenanceServices.IndexMaintenances()

                return maintenances

            } catch (err) {
                throw err
            }

        },
        createMaintenance: async(context, data) => {

            try {

                const maintenance = await MaintenanceServices.StoreMaintenance(data)

                return maintenance

            } catch (err) {
                throw err
            }

        },
        getMaintenanceByID: async(context, data) => {

            try{

                const payment = await MaintenanceServices.GetMaintenanceByID(data.id)

                return payment

            } catch (err) {
                throw err
            }

        },
        updateMaintenance: async(context, data) => {

            try {

                const paymentUpdated = await MaintenanceServices.UpdateMaintenance(data.id, data.info)

                return paymentUpdated

            } catch (err) {
                throw err
            }

        },
        softDeleteMaintenance: async(context, id) => {

            try {

                const paymentDeleted = await MaintenanceServices.SoftDeleteMaintenance(id)

                return paymentDeleted

            } catch (err) {
                throw err
            }

        },
        deleteMaintenance: async(context, id) => {

            try {

                const paymentDeleted = await MaintenanceServices.DeleteMaintenance(id)

                return paymentDeleted

            } catch (err) {
                throw err
            }

        },
    }
}