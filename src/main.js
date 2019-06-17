import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: "AIzaSyCzq3LDjM-fhLgLEqnJ_ffSDrSZZWY8Gt4",
    authDomain: "news-d4ac3.firebaseapp.com",
    databaseURL: "https://news-d4ac3.firebaseio.com",
    projectId: "news-d4ac3",
    storageBucket: "news-d4ac3.appspot.com",
    messagingSenderId: "419130403383",
    appId: "1:419130403383:web:0b6eade8c5d6d4d3"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});