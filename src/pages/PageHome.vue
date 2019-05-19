<template>
  <v-content>
    <app-form></app-form>
    <app-card-opportunity :opportunity="opportunity_audits" :loading="loading"></app-card-opportunity>
    <app-card-diagnostics :diagnostic="diagnostic_audits" :loading="loading"></app-card-diagnostics>
    <app-card-passed :passed="passed_audits" :loading="loading"></app-card-passed>

    <div v-if="errors" class="text-xs-center errors">{{errors}}</div>
  </v-content>
</template>

<script>
import AppForm from "../components/AppForm.vue";
import AppCardOpportunity from "../components/AppCardOpportunity.vue";
import AppCardDiagnostics from "../components/AppCardDiagnostics.vue";
import AppCardPassed from "../components/AppCardPassed.vue";

export default {
  components: {
    AppForm,
    AppCardOpportunity,
    AppCardDiagnostics,
    AppCardPassed
  },
  data() {
    return {};
  },
  created() {
    this.fetchData();
  },
  methods: {
    // if loading data then start page
    async fetchData() {
      // try {
      //   await this.$store.dispatch("getPageSpeedData");
      // } catch (error) {
      //   console.log(error);
      // }
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    errors() {
      return this.$store.state.errors;
    },
    opportunity_audits() {
      return this.$store.state["opportunity_audits"];
    },
    diagnostic_audits() {
      return this.$store.state["diagnostic_audits"];
    },
    passed_audits() {
      return this.$store.state["passed_audits"];
    }
  }
};
</script>
