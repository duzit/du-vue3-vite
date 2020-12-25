import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import installElementPlus from './plugins/element.js'
import config from './config.js';

const app = createApp(App)
installElementPlus(app)
config(app)
app.mount('#app')