<template>
  <v-app>
    <v-app-bar>
      <v-container class="d-flex align-center py-0">
        <v-app-bar-title class="pl-0">
          <div class="d-flex align-center">Ribbon</div>
        </v-app-bar-title>
      </v-container>
    </v-app-bar>

    <v-main>
      <section id="hero">
        <v-sheet class="d-flex align-center pb-16" color="grey-darken-3">
          <v-container class="text-center">
            <v-responsive class="mx-auto">
              <h3 class="text-h3">Try Ribbon's all new features</h3>

              <p class="mt-4 text-medium-emphasis">
                Our all-in-one platform gives you the banking, accounting,
                fundraising, and organizational tools you need to build a
                successful charity under the umbrella of your fiscal sponsor.
              </p>
            </v-responsive>
          </v-container>
        </v-sheet>
      </section>

      <v-sheet>
        <section id="filter">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <h2 class="text-h4">Ribbon Donor List</h2>

                <p class="text-primary mt-3">In Beta now!</p>

                <p class="mt-3">See all those that have given in one place!</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-responsive
                  class="mx-auto"
                  max-width="300"
                >
                  <v-text-field
                    v-model="search"
                    label="Search"
                    append-icon="mdi-magnify"
                  ></v-text-field>
                </v-responsive>
                
                <v-progress-circular
                  v-if="loading"
                  color="success"
                  indeterminate
                  class="mx-auto"
                />

                <v-data-table
                  v-else
                  :headers="headers"
                  :items="donors"
                  :items-per-page="5"
                  :sort-by="sortBy"
                  :sort-desc="sortDesc"
                  :search="search"
                  item-key="id"
                  class="donors-table"
                >
                <template v-slot:item.total_donations="{ item }">
                  {{ formatCurrency(item.total_donations) }}
                </template>
                <template v-slot:item.first_donation="{ item }">
                  {{ formatDate(item.first_donation) }}
                </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </section>
      </v-sheet>

      <v-sheet class="py-16" color="#1818181a">
        <section id="grid">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-responsive width="350">
                  <h2 class="text-h4">Show your support feature</h2>
                  <p class="text-success mt-3">Available now!</p>
                  <p class="mt-3">
                    Easily send messages to those that have given!
                  </p>
                </v-responsive>
              </v-col>
              <v-sheet width="400" class="mx-auto">
                <v-form
                  v-model="valid"
                  validate-on="submit"
                  @submit.prevent="submit"
                >
                  <v-textarea
                    v-model="message"
                    :rules="messageRules"
                    label="Message"
                  ></v-textarea>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="donor_id"
                    label="Donor Id"
                  ></v-text-field>
                  <v-btn type="submit" block class="mt-2">Send</v-btn>
                </v-form>
              </v-sheet>
            </v-row>
          </v-container>
        </section>
      </v-sheet>
    </v-main>

    <v-footer>
      <v-container
        class="text-overline d-flex align-center justify-space-between"
      >
        <div>Copyright &copy; 2023 Flourish Change Inc dba Ribbon</div>

        <v-icon icon="mdi-bank" size="x-large" />
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',

  data() {
    return {
      donors: [],
      valid: false,
      email: '',
      donor_id: '',
      message: '',
      search: "",
      sortBy: "full_name",
      sortDesc: false,
      headers: [
        { text: "Name", value: "full_name", sortable: true },
        { text: "Email", value: "email", sortable: true },
        {
          text: "Total Donations",
          value: "total_donations",
          align: "left",
          sortable: true,
        },
        {
          text: "First Donation",
          value: "first_donation",
          align: "left",
          sortable: true,
        },
      ],
      loading: false,
      emailRules: [
        (value) => {
          if (value) return true;

          return 'E-mail is required.';
        },
      ],
      messageRules: [
        (value) => {
          if (value) return true;

          return 'Message is required.';
        },
      ],
    };
  },
  mounted() {
    this.loading = true;
    axios
      .get('https://interview.ribbon.giving/api/donors')
      .then((response) => {
        this.donors = response.data.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log("Error during fetch", error.message);
        this.loading = false;
      });
  },
  methods: {
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formatter.format(amount);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async submit() {
      // Send message to server.
    },
  },
};
</script>
