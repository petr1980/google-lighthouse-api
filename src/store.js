import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { getWastedMs } from './helpers/wasted';
import './helpers/utils';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    errors: null,
    page_speed_data: {},
    opportunity_audits: {},
    diagnostic_audits: {},
    passed_audits: {},
    path: 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=',
    // url: 'https://habr.com/ ' // start page
    url: ''
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.errors = payload
    },
    getPageSpeedData(state, payload) {
      state.page_speed_data = payload;
    },
    getOpportunityAudits(state, payload) {
      state.opportunity_audits = payload;
    },
    getDiagnosticAudits(state, payload) {
      state.diagnostic_audits = payload;
    },
    getPassedAudits(state, payload) {
      state.passed_audits = payload;
    },
    setUrl(state, payload) {
      state.url = payload
    }

  },
  actions: {
    async getPageSpeedData({ state, commit }) {
      commit('setLoading', true)
      commit('setError', null)
      commit('getPageSpeedData', null)
      commit('getOpportunityAudits', null)
      commit('getDiagnosticAudits', null)
      commit('getPassedAudits', null)

      try {
        const result = await axios.get(state.path + state.url);
        const clone = JSON.parse(JSON.stringify(result));

        let res = Util.prepareReportResult(clone.data.lighthouseResult);
        let category = res.reportCategories.find(cat => cat.id === 'performance');

        commit('getPageSpeedData', clone.data.lighthouseResult)

        commit('getOpportunityAudits', category.auditRefs
          .filter(audit => audit.group === 'load-opportunities' && !Util.showAsPassed(audit.result))
          .sort((auditA, auditB) => getWastedMs(auditB) - getWastedMs(auditA)))

        commit('getDiagnosticAudits', category.auditRefs
          .filter(audit => audit.group === 'diagnostics' && !Util.showAsPassed(audit.result))
          .sort((a, b) => {
            const scoreA = a.result.scoreDisplayMode === 'informative' ? 100 : Number(a.result.score);
            const scoreB = b.result.scoreDisplayMode === 'informative' ? 100 : Number(b.result.score);
            return scoreA - scoreB;
          }));

        commit('getPassedAudits', category.auditRefs
          .filter(audit => (audit.group === 'load-opportunities' || audit.group === 'diagnostics') &&
            Util.showAsPassed(audit.result)))

        commit('setLoading', false)

      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.response.data.error.message)
      }
    },

    setUrl({ commit, dispatch }, url) {
      commit('setUrl', url);
      dispatch("getPageSpeedData")
    }
  }
})
