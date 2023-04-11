import { createApp } from 'vue'
<<<<<<< HEAD

=======
import { createPinia } from 'pinia'
>>>>>>> bc1767f3839c492de2d41c44879108f642a4275d
import App from './App.vue'

import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'

<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap'
=======
createApp(App).use(router).use(createPinia()).mount('#app')
>>>>>>> bc1767f3839c492de2d41c44879108f642a4275d
