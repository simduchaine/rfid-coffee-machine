<template>
  <div class="content">
    <div class="container-fluid">
      <input type="number" name="rfid-scan" v-focus v-model="user.rfid" hidden />

      <router-link
        class="btn btn-info btn-fill"
        style="margin-left:10px;margin-bottom:15px;"
        :to="{ path: '/admin/employees' }"
      >Back</router-link>

      <div class="row">
        <div class="col-12">
          <card>
            <h4 slot="header" class="card-title">Add New Employee</h4>
            <div class="row">
              <div class="rfid-scanner">Scan RFID chip</div>
            </div>
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
                  @click.prevent="addEmployee"
                >Add Employee</button>
              </div>
              <div class="clearfix"></div>
            </form>
            <div v-if="employeeAdded" class="alert alert-success" style="margin-top:15px">
              <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
                <i class="nc-icon nc-simple-remove"></i>
              </button>
              <span>Employee Added!</span>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import { database } from "../../firebase";

export default {
  name: "AddEmployee",
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
        funds: 20
      },
      employeeAdded: false
    };
  },
  methods: {
    addEmployee() {
      database.ref("employees/" + this.user.rfid).set({
        rfid: this.user.rfid,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        name: this.user.firstName + " " + this.user.lastName,
        email: this.user.email,
        department: this.user.department,
        funds: this.user.funds
      });
      this.employeeAdded = true;
      this.resetForm();
    },
    resetForm() {
      this.user.email = "";
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.rfid = "";
      this.user.department = "";
      this.user.funds = 20;
    }
  }
};
</script>
<style>
.rfid-scanner {
  outline: 2px dashed gray;
  outline-offset: -10px;
  background: lightgray;
  height: 10rem;
  margin: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: gray;
  cursor: pointer;
}
</style>
