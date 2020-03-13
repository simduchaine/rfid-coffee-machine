<template>
  <div class="content">
    <div class="container-fluid">
      <router-link
        class="btn btn-info btn-fill"
        style="margin-left:10px;margin-bottom:15px;"
        :to="{ path: '/admin/employees' }"
      >Back</router-link>
      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Edit {{ user.firstName }} {{ user.lastName }}</h4>
            <form>
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
                  <base-input
                    type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    v-model="user.lastName"
                  ></base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <base-input type="email" label="Email" placeholder="Email" v-model="user.email"></base-input>
                </div>
                <div class="col-md-6">
                  <base-input
                    type="text"
                    label="Department"
                    placeholder="Department"
                    v-model="user.department"
                  ></base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <base-input
                    type="number"
                    label="RFID"
                    placeholder="RFID Number"
                    v-model="user.rfid"
                    disabled
                  ></base-input>
                </div>
                <div class="col-md-6">
                  <base-input
                    type="number"
                    label="Credits Balance / Funds"
                    placeholder="20"
                    v-model="user.funds"
                  ></base-input>
                </div>
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-info btn-fill float-right"
                  @click.prevent="updateEmployee"
                >Update Employee</button>
              </div>
              <div class="clearfix"></div>
            </form>
            <div v-if="employeeUpdated" class="alert alert-success" style="margin-top:15px">
              <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
                <i class="nc-icon nc-simple-remove"></i>
              </button>
              <span>Employee Updated!</span>
            </div>
          </card>
        </div>
      </div>
      <button
        class="btn btn-danger btn-fill"
        style="margin-left:10px;margin-bottom:15px;"
        @click="removeEmployee"
      >Delete {{ user.firstName }} {{ user.lastName }}</button>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import { database } from "../../firebase";

export default {
  name: "EditEmployee",
  components: {
    Card
  },
  data() {
    return {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        rfid: "",
        department: "",
        funds: null
      },
      employeeUpdated: false
    };
  },
  created() {
    database
      .ref("employees/" + this.$route.params.rfid)
      .once("value")
      .then(snapshot => {
        this.user.email = snapshot.val().email;
        this.user.firstName = snapshot.val().firstName;
        this.user.lastName = snapshot.val().lastName;
        this.user.rfid = snapshot.val().rfid;
        this.user.department = snapshot.val().department;
        this.user.funds = parseFloat(snapshot.val().funds);
      });
  },
  methods: {
    updateEmployee() {
      database.ref("employees/" + this.user.rfid).set({
        rfid: this.user.rfid,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        name: this.user.firstName + " " + this.user.lastName,
        email: this.user.email,
        department: this.user.department,
        funds: parseFloat(this.user.funds)
      });
      this.employeeUpdated = true;
    },
    removeEmployee() {
      database.ref("employees/" + this.user.rfid).remove();
      this.$router.push({ path: "/admin/employees" });
    }
  }
};
</script>
<style>
</style>
