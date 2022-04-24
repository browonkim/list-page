import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {makeServer} from "@/mockup/mockup-server";
import {mockData} from "@/mockup/mock-data";

// mock server (should be deleted)
makeServer()

// local storage initializing
if (window.localStorage.getItem('data') === null) {
    window.localStorage.setItem('data', JSON.stringify(mockData))
}

createApp(App).use(store).use(router).mount('#app')

