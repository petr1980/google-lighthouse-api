<template>
  <v-layout>
    <v-flex xs12>
      <div v-if="loading" class="text-xs-center">
        <v-progress-circular :size="50" color="#5ee2a0" indeterminate></v-progress-circular>
      </div>

      <v-card flat v-if="!loading && passed && passed.length">
        <v-card-text>
          <v-toolbar flat height="45" class="toolbar">
            <v-toolbar-title class="toolbar_title">Successful Audits</v-toolbar-title>
          </v-toolbar>
          <v-expansion-panel>
            <v-expansion-panel-content
              class="passed"
              expand-icon="arrow_drop_down"
              v-for="info in passed"
              :key="info.id"
            >
              <template v-slot:header>
                <div class="panel-text">{{ info.result.title }}</div>
                <div
                  v-if="info.result.displayValue"
                  class="panel-description"
                >- {{ info.result.displayValue }}</div>
              </template>
              <v-card>
                <v-card-text>Information in development</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "AppCardPassed",
  props: {
    passed: {
      type: [Object, Array],
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.show = true;
  },
  data: () => ({
    table_headers: [
      { text: "URL", sortable: false },
      { text: "Size, (KB)", sortable: false },
      { text: "Savings, (KB)", sortable: false }
    ],
    show: false
  }),

  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "../assets/style/components/card.scss";
</style>

