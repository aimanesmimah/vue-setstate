import Vue from 'vue';
import VueResource from 'vue-resource';
import Exemple from './components/Exemple.vue';
import setState from './lib';

Vue.config.devtools= true 
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(setState)


var vue= new Vue({
    el: '#app', 
    components:{
        Exemple
    },
    template: '<Exemple />'
})