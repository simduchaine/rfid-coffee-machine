<template>
  <div>
    <div>
      <form class="register-form">
        <input type="email" v-model="email" placeholder="Email Address" />
        <button class="btn" @click.prevent="resetPassword">
          Reset Password
        </button>
        <p><router-link to="login">Back to Log In</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "../../firebase";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: ""
    };
  },
  methods: {
    resetPassword() {
      auth
        .sendPasswordResetEmail(this.email)
        .then(() => {})
        .catch(error => {
          // The creation failed...
        });
    }
  }
};
</script>

<style></style>
