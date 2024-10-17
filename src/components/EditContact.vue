<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="alert alert-danger mt-4" v-if="errors.length">
          <ul class="mb-0">
            <li v-for="(errors, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="updateContact" novalidate>
          <fieldset>
            <div class="form-group">
              <label class="form-label mt-4">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="contact.name"
                placeholder="Enter name"
              />
            </div>
            <div class="form-group">
              <label class="form-label mt-4">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="contact.email"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label class="form-label mt-4">Designation</label>
              <input
                type="text"
                class="form-control"
                v-model="contact.designation"
                placeholder="Enter designation"
              />
            </div>
            <div class="form-group">
              <label class="form-label mt-4">Contact No</label>
              <input
                type="text"
                class="form-control"
                v-model="contact.contact_no"
                placeholder="Enter contact number"
              />
            </div>
            <button class="btn btn-primary mt-4">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "EditContact",
  data() {
    return {
      contact: {},
      name: "",
      email: "",
      designation: "",
      contact_no: "",

      errors: [],
    };
  },
  created() {
    this.getContactById();
  },
  methods: {
    async getContactById() {
      let url = `http://localhost:8000/api/contact/${this.$route.params.id}`;
      await axios
        .get(url)
        .then((response) => {
          this.contact = response.data.contact;
          console.log(this.contact);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateContact() {
      this.errors = [];

      // Validation simple
      if (!this.contact.name) {
        this.errors.push("Name is required");
      }
      if (!this.contact.email) {
        this.errors.push("Email is required");
      }
      if (!this.contact.designation) {
        this.errors.push("Designation is required");
      }
      if (!this.contact.contact_no) {
        this.errors.push("Contact number is required");
      }

      // S'il n'y a pas d'erreurs, effectuer la requête
      if (!this.errors.length) {
        // Envoie les données sous forme d'objet JSON
        const formData = {
          name: this.contact.name,
          email: this.contact.email,
          designation: this.contact.designation,
          contact_no: this.contact.contact_no,
        };

        try {
          const url = `http://localhost:8000/api/updateContact/${this.$route.params.id}`;

          // Utiliser `PATCH` pour une mise à jour partielle, ou `PUT` si c'est une mise à jour complète
          const response = await axios.patch(url, formData);

          if (response.status === 200) {
            alert(response.data.message);
          } else {
            console.log("An error occurred:", response.data);
          }
        } catch (error) {
          console.error("Request failed:", error.response);
          this.errors.push(
            error.response?.data?.message ||
              "An error occurred during the request."
          );
        }
      }
    },
  },
  mounted: function () {
    console.log("edit component loded...");
  },
};
</script>
