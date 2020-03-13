<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <router-link
            class="btn btn-info btn-fill"
            style="margin-left:10px;margin-bottom:15px;"
            :to="{ path: '/admin/employees/add' }"
          >Add Employee</router-link>
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">
              <h4 class="card-title">Employees</h4>
            </template>
            <link-table
              class="table-hover table-striped"
              :columns="table.columns"
              :data="table.data"
            ></link-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LinkTable from "src/components/TableSelectable.vue";
import Card from "src/components/Cards/Card.vue";
import { database } from "../../firebase";

const tableColumns = ["Name", "RFID", "Department", "Funds"];

export default {
  components: {
    LinkTable,
    Card
  },
  data() {
    return {
      table: {
        columns: [...tableColumns],
        data: []
      }
    };
  },
  created() {
    database
      .ref("employees")
      .orderByChild("funds")
      .on("child_added", data => {
        this.table.data.push(data.val());
      });
  }
};
</script>
<style></style>
