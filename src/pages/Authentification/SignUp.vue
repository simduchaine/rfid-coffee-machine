<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col">
          <Card style="margin-top:20%">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <base-input type="text" placeholder="First Name" v-model="firstName"></base-input>
                </div>
                <div class="col-md-6">
                  <base-input type="text" placeholder="Last Name" v-model="lastName"></base-input>
                </div>
              </div>
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
                  <button class="btn btn-info btn-fill" @click.prevent="SignUp">Sign-Up</button>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p>
                    Already registered?
                    <router-link to="/login">Sign In</router-link>
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
  name: "signup",
  data() {
    return {
      firstName: "",
      lastName: "",
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
    SignUp() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          let createdUser = auth.currentUser;
          createdUser
            .updateProfile({
              displayName: this.fullName
            })
            .then(() => {
              this.$router.replace("/");
            })
            .catch(error => {
              this.error = error.message;
              this.loginError = true;
            });
        })
        .catch(error => {
          // The creation failed...
          this.error = error.message;
          this.loginError = true;
        });
    }
  },
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    }
  }
};
</script>

<style></style>
