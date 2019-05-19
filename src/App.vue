<template>
  <v-app>
    <app-header></app-header>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader
  },
  data() {
    return {
      //
    };
  }
};
</script>


<style lang="scss">
@import "./assets/style/main.scss";
</style>
