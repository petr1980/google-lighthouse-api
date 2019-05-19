<template>
  <v-layout>
    <v-flex xs12>
      <div v-if="loading" class="text-xs-center">
        <v-progress-circular :size="50" color="#ff6565" indeterminate></v-progress-circular>
      </div>

      <v-card flat v-if="!loading && opportunity && opportunity.length">
        <v-card-text>
          <v-toolbar flat height="45" class="toolbar">
            <v-toolbar-title class="toolbar_title">Opportunities</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="toolbar_title">Approximate savings</v-toolbar-title>
          </v-toolbar>
          <v-expansion-panel>
            <v-expansion-panel-content
              :class="procent[key] <= 40   ? 'average' : 'fail'"
              expand-icon="arrow_drop_down"
              v-for="(info, key) in opportunity"
              :key="info.id"
            >
              <template v-slot:header>
                <div class="panel-text">{{ info.result.title }}</div>
                <div class="progress">
                  <div
                    class="progress_text"
                  >{{ (info.result.details.overallSavingsMs/1000).toFixed(2) }} s</div>
                  <v-progress-linear
                    v-model="procent[key]"
                    :active="show"
                    :color="procent[key] <= 40 ? '#fec163' : '#ff6565'"
                    background-color="#edf0f5"
                    height="6"
                  ></v-progress-linear>
                </div>
              </template>
              <v-card v-if="info.id==='time-to-first-byte' ">
                <v-card-text>{{info.result.description }}</v-card-text>
              </v-card>
              <v-card v-else>
                <v-data-table
                  class="elevation-3"
                  hide-actions
                  :headers="table_headers"
                  :items="info.result.details.items"
                >
                  <template v-slot:items="props">
                    <td class="first">
                      <div :title="props.item.url">{{ props.item.url }}</div>
                    </td>
                    <td>{{ props.item.totalBytes/1000 }}</td>
                    <td>{{ props.item.wastedBytes/1000 || props.item.wastedMs + ' ms' }}</td>
                  </template>
                </v-data-table>
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
  name: "AppCardOpportunity",
  props: {
    opportunity: {
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
  computed: {
    color_chart() {
      return this.procent < 30 ? "#ff6565" : "#edf0f5";
    },
    procent() {
      let summ = this.counts_sum / 1000 < 1 ? 1000 : this.counts_sum;
      return this.counts.map(item => (item * 100) / summ);
    },
    counts_sum() {
      return this.counts.reduce((a, b) => a + b);
    },
    counts() {
      return this.opportunity.map(
        item => +item.result.details.overallSavingsMs
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/components/card.scss";
</style>

