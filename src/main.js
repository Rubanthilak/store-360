import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index.js';

import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import VCalendar from 'v-calendar';

import NavigationBar from './components/UI/NavigationBar/NavigationBar.vue';
import SideBar from './components/UI/SideBar/SideBar.vue';
import SearchBar from './components/UI/SearchBar/SearchBar.vue';
import SearchBarDropdown from './components/UI/SearchBar/SearchBarDropdown.vue';
import SearchBarCustomer from './components/UI/SearchBar/SearchBarCustomer.vue';
import TheButton from './components/UI/Buttons/TheButton.vue';
import IconButton from './components/UI/Buttons/IconButton.vue';
import TheTable from './components/UI/Common/TheTable.vue';
import ThePopup from './components/UI/Popups/ThePopup.vue';
import PopupListener from './components/UI/Popups/PopupListener.vue';
import CustomerCard from './components/UI/Cards/CustomerCard.vue';
import SaleCard from './components/UI/Cards/SaleCard.vue';
import DropdownMenu from './components/UI/DropdownMenu/DropdownMenu.vue';
import ListBox from './components/UI/ListBox/ListBox.vue';
import ListBoxItemSort from './components/UI/ListBox/ListBoxItemSort.vue';
import ListBoxCustomerSort from './components/UI/ListBox/ListBoxCustomerSort.vue';
import SnackBar from './components/UI/SnackBar/SnackBar.vue'
import TheTabs from './components/UI/Tabs/TheTabs.vue'
import LoadingSpinner from './components/UI/Spinner/LoadingSpinner.vue'
import InvoicePreview from './components/UI/Invoice/InvoicePreview.vue'
import DatePicker from './components/UI/DatePicker/DatePicker.vue'

import SvgIcon from './components/UI/Icons/SvgIcon.vue';
import BackIcon from './components/UI/Icons/BackIcon.vue';
import BadgeIcon from './components/UI/Icons/BadgeIcon.vue';
import BoxIcon from './components/UI/Icons/BoxIcon.vue';
import BrowserIcon from './components/UI/Icons/BrowserIcon.vue';
import CrossIcon from './components/UI/Icons/CrossIcon.vue';
import DeleteIcon from './components/UI/Icons/DeleteIcon.vue';
import HomeIcon from './components/UI/Icons/HomeIcon.vue';
import MinusIcon from './components/UI/Icons/MinusIcon.vue';
import SearchIcon from './components/UI/Icons/SearchIcon.vue';
import TagIcon from './components/UI/Icons/TagIcon.vue';
import UsersIcon from './components/UI/Icons/UsersIcon.vue';
import WalletIcon from './components/UI/Icons/WalletIcon.vue';
import WarnIcon from './components/UI/Icons/WarnIcon.vue';
import CheckIcon from './components/UI/Icons/CheckIcon.vue';
import AngleUpIcon from './components/UI/Icons/AngleUpIcon.vue';
import AngleDownIcon from './components/UI/Icons/AngleDownIcon.vue';
import UserCircleIcon from './components/UI/Icons/UserCircleIcon.vue';


const app = createApp(App);

app.use(router);
app.use(store);
app.use(moshaToast);
app.use(VCalendar);

app.component('svg-icon',SvgIcon);

app.component('back-icon',BackIcon);
app.component('badge-icon',BadgeIcon);
app.component('box-icon',BoxIcon);
app.component('browser-icon',BrowserIcon);
app.component('cross-icon',CrossIcon);
app.component('delete-icon',DeleteIcon);
app.component('home-icon',HomeIcon);
app.component('minus-icon',MinusIcon);
app.component('search-icon',SearchIcon);
app.component('tag-icon',TagIcon);
app.component('users-icon',UsersIcon);
app.component('wallet-icon',WalletIcon);
app.component('warn-icon',WarnIcon);
app.component('check-icon',CheckIcon);
app.component('angle-up-icon',AngleUpIcon);
app.component('angle-down-icon',AngleDownIcon);
app.component('user-circle-icon',UserCircleIcon);

app.component('navigation-bar',NavigationBar);
app.component('side-bar',SideBar);
app.component('search-bar',SearchBar);
app.component('search-bar-dropdown',SearchBarDropdown);
app.component('search-bar-customer',SearchBarCustomer);
app.component('the-button',TheButton);
app.component('icon-button',IconButton);
app.component('the-table',TheTable);
app.component('the-popup',ThePopup);
app.component('popup-listener',PopupListener);
app.component('customer-card',CustomerCard);
app.component('sale-card',SaleCard);
app.component('dropdown-menu',DropdownMenu);
app.component('list-box',ListBox);
app.component('list-box-item-sort',ListBoxItemSort);
app.component('list-box-customer-sort',ListBoxCustomerSort);
app.component('snack-bar',SnackBar);
app.component('the-tabs',TheTabs);
app.component('loading-spinner',LoadingSpinner);
app.component('invoice-preview',InvoicePreview);
app.component('date-picker',DatePicker);

app.mount('#app');

