<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col">
          <Card style="margin-top:20%">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <base-input type="email" placeholder="Email" v-model="email"></base-input>
                </div>
                <div class="col-md-6">
                  <base-input type="password" placeholder="Password" v-model="password"></base-input>
                </div>
              </div>
              <div class="row">
                <div class="col" style="margin-bottom:2rem">
                  <button class="btn btn-info btn-fill" @click.prevent="login">Login</button>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p>
                    Not registered?
                    <router-link to="/sign-up">Create an account</router-link>
                  </p>
                  <p>
                    Forgot password?
                    <router-link to="/reset-password">Reset your password</router-link>
                  </p>
                </div>
              </div>
            </form>
          </Card>
          <div v-if="loginError" class="alert alert-danger" style="margin-top:15px">
            <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
              <i class="nc-icon nc-simple-remove"></i>
            </button>
            <span>{{ error }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../../firebase";
import Card from "../../components/Cards/Card";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loginError: false
    };
  },
  components: {
    Card
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace("/admin/overview");
        })
        .catch(error => {
          // The creation failed...
          this.error = error.message;
          this.loginError = true;
        });
    }
  }
};
</script>

<style>
body {
  background: rgba(203, 203, 210, 0.15);
}
</style>
