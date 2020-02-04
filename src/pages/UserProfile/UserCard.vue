<template>
  <card class="card-user">
    <img
      slot="image"
      src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
      alt="..."
    />
    <div class="author">
      <a href="#">
        <avatar
          class="avatar border-gray"
          :size="124"
          :customStyle="avatarStyle"
          :username="username"
        ></avatar>

        <h4 class="title">
          {{ username }}
          <br />
          <small>michael24</small>
        </h4>
      </a>
    </div>
    <p class="description text-center">
      "Lamborghini Mercy
      <br />Your chick she so thirsty
      <br />I'm in that two seat Lambo"
    </p>
  </card>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import Avatar from "vue-avatar";
import { auth } from "../../firebase";

export default {
  components: {
    Card,
    Avatar
  },
  data() {
    return {
      details: [
        {
          title: "12",
          subTitle: "Files"
        },
        {
          title: "2GB",
          subTitle: "Used"
        },
        {
          title: "24,6$",
          subTitle: "Spent"
        }
      ],
      avatarStyle: {
        margin: "0 auto"
      },
      username: ""
    };
  },
  methods: {
    getClasses(index) {
      var remainder = index % 3;
      if (remainder === 0) {
        return "col-md-3 col-md-offset-1";
      } else if (remainder === 2) {
        return "col-md-4";
      } else {
        return "col-md-3";
      }
    },
    getUsername() {
      let user = auth.currentUser;
      if (user != null) {
        this.username = user.displayName;
      }
    },
    created() {
      this.getUsername;
    }
  }
};
</script>
<style></style>
