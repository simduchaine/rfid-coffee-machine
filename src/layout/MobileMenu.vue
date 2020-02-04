<template>
  <ul class="nav nav-mobile-menu">
    <!-- Notification center -->
    <!-- <base-dropdown>
      <template slot="title">
        <i class="fa fa-globe"></i>
        <b class="caret"></b>
        <span class="notification">5 Notifications</span>
      </template>
      <a class="dropdown-item" href="#">Notification 1</a>
      <a class="dropdown-item" href="#">Notification 2</a>
      <a class="dropdown-item" href="#">Notification 3</a>
      <a class="dropdown-item" href="#">Notification 4</a>
      <a class="dropdown-item" href="#">Another notification</a>
    </base-dropdown>-->

    <li class="nav-item">
      <router-link class="nav-link" :to="{ path: '/admin/user' }">
        <i class="nc-icon nc-circle-09" style="margin-right:5px"></i>
        Account
      </router-link>
    </li>

    <!-- Search button -->
    <!-- <li class="nav-item">
      <a href="#" class="nav-link">
        <i class="nc-icon nc-zoom-split hidden-lg-up"></i>
        <span class="d-lg-none">Search</span>
      </a>
    </li>-->

    <li class="nav-item">
      <a class="nav-link" href="#pablo">
        <span class="no-icon">Log out</span>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: "mobile-menu"
};
</script>
<style></style>
