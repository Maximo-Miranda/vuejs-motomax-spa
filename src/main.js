import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify';

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import es from 'vee-validate/dist/locale/es';

import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

// loop over all rules
for (let rule in rules) {
    extend(rule, {
        ...rules[rule], // add the rule
        message: es.messages[rule] // add its message
    });
}

extend('password', {
    validate: (value, { other }) => value === other,
    message: 'La confirmación de contraseña no coincide.',
    params: [{ name: 'other', isTarget: true }]
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')