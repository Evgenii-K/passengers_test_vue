import Vue from 'vue'
import App from './App.vue'
import { Directive } from '@directives/detect-viewport';
import Button from '@components/BaseComponents/BaseButton.vue'
import PopUp from '@components/BaseComponents/PopUp.vue'

Vue.directive('detect-viewport', Directive);
Vue.component('Button', Button);
Vue.component('PopUp', PopUp);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
