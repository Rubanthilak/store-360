import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import NavigationBar from './components/UI/NavigationBar/NavigationBar.vue';

const app = createApp(App);

app.use(router);

app.component('navigation-bar',NavigationBar)

app.mount('#app');

