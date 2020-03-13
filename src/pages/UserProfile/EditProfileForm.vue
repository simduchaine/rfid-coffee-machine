<template>
  <card>
    <h4 slot="header" class="card-title">Edit Profile</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <base-input type="email" label="Email" placeholder="Email" v-model="user.email" disabled></base-input>
        </div>
        <!-- <div class="col-md-6">
          <base-input
            type="password"
            label="Password"
            placeholder="Password"
            v-model="user.password"
          ></base-input>
        </div>-->
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="First Name"
            placeholder="First Name"
            v-model="user.firstName"
          ></base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text" label="Last Name" placeholder="Last Name" v-model="user.lastName"></base-input>
        </div>
      </div>

      <div class="text-center">
        <button
          type="submit"
          class="btn btn-info btn-fill float-right"
          @click.prevent="updateProfile"
        >Update Profile</button>
        <button
          type="submit"
          class="btn btn-info btn-fill float-right mx-2"
          @click.prevent="changePassword"
        >Reset Password</button>
      </div>

      <div class="clearfix"></div>
    </form>
    <div v-if="profileUpdated" class="alert alert-success" style="margin-top:15px">
      <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
        <i class="nc-icon nc-simple-remove"></i>
      </button>
      <span>Profile Updated!</span>
    </div>
    <div v-if="passwordEmailSent" class="alert alert-success" style="margin-top:15px">
      <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
        <i class="nc-icon nc-simple-remove"></i>
      </button>
      <span>Reset Password Email Sent! Check your inbox!</span>
    </div>
    <div v-if="profileError" class="alert alert-danger" style="margin-top:15px">
      <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
        <i class="nc-icon nc-simple-remove"></i>
      </button>
      <span>{{ errorMessage }}</span>
    </div>
  </card>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import { auth } from "../../firebase";

export default {
  components: {
    Card
  },
  data() {
    return {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      },
      profileUpdated: false,
      profileError: false,
      passwordEmailSent: false,
      errorMessage: ""
    };
  },
  methods: {
    updateProfile() {
      let user = auth.currentUser;
      user
        .updateProfile({
          displayName: this.fullName
        })
        .then(() => {
          // Update successful.
          this.profileUpdated = true;
        })
        .catch(error => {
          // An error happened.
          this.profileError;
          this.errorMessage = error.message;
        });
    },
    changePassword() {
      auth
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          // Email sent.
          this.passwordEmailSent = true;
        })
        .catch(error => {
          // An error happened.
          this.profileError;
          this.errorMessage = error.message;
        });
    }
  },
  created() {
    let user = auth.currentUser;
    if (user != null) {
      this.user.username = user.displayName;
      this.user.email = user.email;
      let fullName = user.displayName.split(" ");
      this.user.firstName = fullName[0];
      this.user.lastName = fullName[1];
    }
  },
  computed: {
    fullName() {
      return this.user.firstName + " " + this.user.lastName;
    }
  }
};
</script>
<style></style>
