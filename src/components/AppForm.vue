<template>
  <v-card flat>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="url" :rules="urlRules" label="Enter url web page" required></v-text-field>

        <v-btn :disabled="!valid || loading" color="success" @click="validate">Go</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AppForm",
  data() {
    return {
      valid: true,
      url: "https://habr.com/",
      urlRules: [
        v => !!v || "Url is required",
        v => /:+\/\/.+/.test(v) || "Url must be valid"
      ]
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.setUrl();
      }
    },
    setUrl() {
      this.$store.dispatch("setUrl", this.url);
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/components/card.scss";
</style>
