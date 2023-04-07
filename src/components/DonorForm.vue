<template>
  <div>
    <v-form
      ref="donorForm"
      @submit.prevent="sendMessage"
      validate-on="submit"
      class="mb-4"
    >
      <v-textarea
        v-model="formData.message"
        :rules="messageRules"
        label="Message"
      ></v-textarea>
      <v-autocomplete
        label="Search for email"
        v-model="formData.email"
        :items="donors"
        :loading="!donors.length"
        item-text="email"
        item-value="id"
        return-object
        :rules="emailRules"
        @change="setDonorId"
      >
      </v-autocomplete>
      <v-text-field v-model="formData.donor_id" label="Donor Id" readonly>
      </v-text-field>
      <v-btn
        type="submit"
        color="primary"
        :disabled="formIsValid || loading"
        class="send-btn"
        large
      >
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          class="ma-2"
        ></v-progress-circular>
        <span v-else> Send Message </span>
      </v-btn>
    </v-form>
    <v-alert
      v-if="submitError"
      type="error"
      timeout="3000"
      @click="submitError = false"
      >Form submission failed</v-alert
    >
    <v-alert
      v-else-if="submitSuccess"
      type="success"
      timeout="3000"
      @click="submitSuccess = false"
      >Form submitted successfully</v-alert
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    submitForm: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['donors']),
    emailRules() {
      return [(value) => !!value || 'Email is required'];
    },
    messageRules() {
      return [
        (value) =>
          (value && value.length >= 15) ||
          'Message must be at least 15 characters',
      ];
    },
  },
  data() {
    return {
      formData: {
        email: null,
        message: '',
        donor_id: '',
      },
      formIsValid: false,
      submitError: false,
      submitSuccess: false,
      loading: false,
    };
  },
  methods: {
    setDonorId(e) {
      this.formData.donor_id = e.id;
    },
    sendMessage() {
      if (this.$refs.donorForm.validate()) {
        this.loading = true;
        this.submitForm({ ...this.formData, email: this.formData.email.email })
          .then((res) => {
            this.submitSuccess = true;
            this.submitError = false;
          })
          .catch((e) => {
            this.submitError = true;
            this.submitSuccess = false;
          })
          .finally(() => {
            this.$refs.donorForm.reset();
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style>
.send-btn {
  min-width: 200px !important;
}
</style>
