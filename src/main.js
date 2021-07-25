import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import installElementPlus from './plugins/element.js'
import config from './config.js';
import router from './router';

const app = createApp(App)
installElementPlus(app)
config(app)
app.use(router).mount('#app')