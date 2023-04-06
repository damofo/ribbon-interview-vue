/* Vue */
import Vue from 'vue';
// import router from "./router";
import store from './store';

Vue.config.productionTip = false;

/* App sass */
// import "./assets/style/app.scss";

/* App component */
import App from './App';

import vuetify from './plugins/vuetify';

/* eslint-disable no-new */
new Vue({
  el: '#app',

  // Attach the Vue instance to the window,
  // so it's available globally.
  created: function () {
    window.Vue = this;
  },

  // router,
  store,
  vuetify,
  render: (h) => h(App),
});
