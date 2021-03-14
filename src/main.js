import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import NavigationBar from './components/UI/NavigationBar/NavigationBar.vue';
import SearchBar from './components/UI/SearchBar/SearchBar.vue';
import TheButton from './components/UI/Buttons/TheButton.vue';
import IconButton from './components/UI/Buttons/IconButton.vue';
import TheTable from './components/UI/Common/TheTable.vue';

const app = createApp(App);

app.use(router);

app.component('navigation-bar',NavigationBar);
app.component('search-bar',SearchBar);
app.component('the-button',TheButton);
app.component('icon-button',IconButton);
app.component('the-table',TheTable);

app.mount('#app');

