import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles'
import 'leaflet/dist/leaflet.css';
import '@/assets/main.scss'

const vuetify = createVuetify({
  components,
  directives,
})

export default vuetify;
