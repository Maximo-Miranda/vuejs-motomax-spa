import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './modules/userStore'
import { paymentStore } from './modules/paymentStore'
import { generalStore } from './modules/generalStore'
import { motorcycleStore } from './modules/motorcycleStore'
import { paymentCollectionStore } from './modules/paymentCollectionStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userStore,
        generalStore,
        motorcycleStore,
        paymentCollectionStore,
        paymentStore,
    }
})