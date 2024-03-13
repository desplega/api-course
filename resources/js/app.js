import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue'
import Home from '@/components/Home.vue';

createApp(Home)
    // .component('Home', Home)
    .mount('#app')
