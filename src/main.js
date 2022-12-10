import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {} from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'


import VueSweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

library.add(faTwitter, faInstagram, faFacebook, faYoutube, fas)

const app = createApp(App)

app.component('fa', FontAwesomeIcon)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueSweetAlert2)

app.mount('#app')