import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import NavigationBar from './components/UI/NavigationBar/NavigationBar.vue';
import SearchBar from './components/UI/SearchBar/SearchBar.vue';
import TheButton from './components/UI/Buttons/TheButton.vue';

const app = createApp(App);

app.use(router);

app.component('navigation-bar',NavigationBar);
app.component('search-bar',SearchBar);
app.component('the-button',TheButton);

app.mount('#app');

