import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {},
});

app.mount('#app');
