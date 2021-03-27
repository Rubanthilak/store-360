import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import NavigationBar from './components/UI/NavigationBar/NavigationBar.vue';
import SearchBar from './components/UI/SearchBar/SearchBar.vue';
import TheButton from './components/UI/Buttons/TheButton.vue';
import IconButton from './components/UI/Buttons/IconButton.vue';
import TheTable from './components/UI/Common/TheTable.vue';
import DeleteIcon from './components/UI/Icons/DeleteIcon.vue';
import ThePopup from './components/UI/Popups/ThePopup.vue';
import PopupNewItem from './components/UI/Popups/PopupNewItem.vue';
import PopupListener from './components/UI/Popups/PopupListener.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('navigation-bar',NavigationBar);
app.component('search-bar',SearchBar);
app.component('the-button',TheButton);
app.component('icon-button',IconButton);
app.component('the-table',TheTable);
app.component('delete-icon',DeleteIcon);
app.component('the-popup',ThePopup);
app.component('popup-new-item',PopupNewItem);
app.component('popup-listener',PopupListener);

app.mount('#app');

