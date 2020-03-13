<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-single-02 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Employees</p>
              <h4 class="card-title">{{ employeesCount }}</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-money-coins text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Total Funds</p>
              <h4 class="card-title">{{ totalFunds }}$</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-stre-down text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Least Funds</p>
              <h4 class="card-title">{{ leastCash.name }}</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-stre-up text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Most Funds</p>
              <h4 class="card-title">{{ mostCash.name }}</h4>
            </div>
          </stats-card>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">
              <h4 class="card-title">Low Funds</h4>
            </template>
            <l-table
              class="table-hover table-striped"
              :columns="table1.columns"
              :data="table1.data"
            ></l-table>
            <router-link
              class="btn btn-info btn-fill"
              style="margin-left:10px;margin-bottom:15px;"
              :to="{ path: '/admin/employees' }"
            >View all</router-link>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar"
          >
            <template slot="header">
              <h4 class="card-title">Employees Funds</h4>
              <p class="card-category">All employees versus their total funds</p>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";
import Card from "src/components/Cards/Card.vue";

import { database } from "../firebase";

const tableColumns = ["Name", "RFID", "Department", "Funds"];

export default {
  components: {
    LTable,
    ChartCard,
    StatsCard,
    Card
  },
  data() {
    return {
      barChart: {
        data: {
          labels: [],
          series: [[], []]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      table1: {
        columns: [...tableColumns],
        data: []
      },
      rfidList: [],
      fundsArray: [],
      employeesArray: [],
      employeesCount: null,
      leastCash: {},
      mostCash: {}
    };
  },
  created() {
    //Create a bar chart
    database.ref("employees").on("child_added", data => {
      this.barChart.data.labels.push(data.val().name);
      this.barChart.data.series[0].push(data.val().funds);
    });

    //Get 5 employees with less funds
    database
      .ref("employees")
      .orderByChild("funds")
      .limitToFirst(5)
      .on("child_added", data => {
        this.table1.data.push(data.val());
      });

    //Get RFID list
    database.ref("employees").on("child_added", data => {
      this.rfidList.push(data.val().rfid);
      this.fundsArray.push(parseFloat(data.val().funds));
      //Count employees
      this.employeesCount = this.rfidList.length;
    });

    //Get Employee profile with least cash
    database
      .ref("employees")
      .orderByChild("funds")
      .limitToFirst(1)
      .on("child_added", data => {
        this.leastCash = data.val();
      });

    //Get Employee profile with most cash
    database
      .ref("employees")
      .orderByChild("funds")
      .limitToLast(1)
      .on("child_added", data => {
        this.mostCash = data.val();
      });
  },
  computed: {
    totalFunds() {
      return this.fundsArray.reduce((a, b) => a + b, 0);
    }
  }
};
</script>
<style></style>
