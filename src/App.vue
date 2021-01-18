<template>
  <v-app data-app class="app-wrapper">
    <router-view></router-view>
  </v-app>
</template>

<script>
import 'material-icons/iconfont/material-icons.scss';
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
<style>
.app-wrapper {
  background: #000 !important;
}
.o-hidden {
  overflow: hidden !important;
}

@media screen and (max-width: 450px){
    h1, div.v-card__title.headline {
      font-size: 20px !important;
    }
    input, .v-card__subtitle {
      font-size: 14px !important;
    }
}
</style>
