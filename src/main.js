import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index.js';

import NavigationBar from './components/UI/NavigationBar/NavigationBar.vue';
import SideBar from './components/UI/SideBar/SideBar.vue';
import SearchBar from './components/UI/SearchBar/SearchBar.vue';
import TheButton from './components/UI/Buttons/TheButton.vue';
import IconButton from './components/UI/Buttons/IconButton.vue';
import TheTable from './components/UI/Common/TheTable.vue';
import ThePopup from './components/UI/Popups/ThePopup.vue';
import PopupListener from './components/UI/Popups/PopupListener.vue';
import CustomerCard from './components/UI/Cards/CustomerCard.vue';
import DropdownMenu from './components/UI/DropdownMenu/DropdownMenu.vue';
import SnackBar from './components/UI/SnackBar/SnackBar.vue'
import TheTabs from './components/UI/Tabs/TheTabs.vue'
import LoadingSpinner from './components/UI/Spinner/LoadingSpinner.vue'

import DeleteIcon from './components/UI/Icons/DeleteIcon.vue';
import WarnIcon from './components/UI/Icons/WarnIcon.vue';
import CrossIcon from './components/UI/Icons/CrossIcon.vue';
import BrowserIcon from './components/UI/Icons/BrowserIcon.vue';
import MinusIcon from './components/UI/Icons/MinusIcon.vue';
import BackIcon from './components/UI/Icons/BackIcon.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('delete-icon',DeleteIcon);
app.component('warn-icon',WarnIcon);
app.component('cross-icon',CrossIcon);
app.component('browser-icon',BrowserIcon);
app.component('minus-icon',MinusIcon);
app.component('back-icon',BackIcon);

app.component('navigation-bar',NavigationBar);
app.component('side-bar',SideBar);
app.component('search-bar',SearchBar);
app.component('the-button',TheButton);
app.component('icon-button',IconButton);
app.component('the-table',TheTable);
app.component('the-popup',ThePopup);
app.component('popup-listener',PopupListener);
app.component('customer-card',CustomerCard);
app.component('dropdown-menu',DropdownMenu);
app.component('snack-bar',SnackBar);
app.component('the-tabs',TheTabs);
app.component('loading-spinner',LoadingSpinner);

app.mount('#app');

