import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './modules/userStore'
import { generalStore } from './modules/generalStore'
import { motorcycleStore } from './modules/motorcycleStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userStore,
        generalStore,
        motorcycleStore
    }
})