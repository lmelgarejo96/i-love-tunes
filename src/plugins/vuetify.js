import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#358680',
                secondary: '#0454ca',
            },
            dark: {
                primary: '#358680',
                secondary: '#0454ca',
            }
        },
    },
});