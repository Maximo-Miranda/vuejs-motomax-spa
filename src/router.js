import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LayoutComponent from './components/shared/LayoutComponent'
import UserComponent from './components/UserComponent'
import store from './store/store'
import MotorcycleComponent from './components/MotorcycleComponent'
import PaymentCollectionComponent from "./components/PaymentCollectionComponent";
import MaintenanceComponent from "./components/MaintenanceComponent";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: LayoutComponent,
        redirect: { name: 'home' },
        children: [
            { path: 'home', component: Home, name: 'home' },
            { path: 'users', component: UserComponent, name: 'users' },
            { path: 'motorcycles', component: MotorcycleComponent, name: 'motorcycles' },
            { path: 'paymentcollection', component: PaymentCollectionComponent, name: 'paymentcollection'},
            { path: 'maintenance', component: MaintenanceComponent, name: 'maintenance'}
        ]
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "about" */ './components/LoginComponent')
    }]
})

router.beforeEach((to, from, next) => {

    const isAuth = store.state.userStore.user.isAuth

    // Validate login route request
    if (to.name == 'login' && !isAuth) {

        if (store.getters.validateAuth) {
            try {

                store.dispatch('getClaims')

                return next({ name: 'home' })

            } catch (error) {

                return next()
            }

        }

        return next()
    }

    if (to.name == 'login' && isAuth) {

        return next({ name: 'home' })
    }

    // Validate all route request
    if (!isAuth) {

        if (store.getters.validateAuth) {

            try {

                store.dispatch('getClaims')

                return next()

            } catch (error) {

                return next({ name: 'login' })
            }

        }

        return next({ name: 'login' })
    }

    if (isAuth) {

        return next()
    }

})

export default router