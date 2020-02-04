import DashboardLayout from "../layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../pages/NotFoundPage.vue";
import Login from "../pages/Authentification/Login.vue";
import SignUp from "../pages/Authentification/SignUp.vue";
import ResetPassword from "../pages/Authentification/ResetPassword.vue";

// Admin pages
import Overview from "src/pages/Overview.vue";
import UserProfile from "src/pages/UserProfile/UserProfile.vue";
import Typography from "src/pages/Typography.vue";
import Icons from "src/pages/Icons.vue";
import AddEmployees from "src/pages/Employees/AddEmployees.vue";
import Employees from "src/pages/Employees/Employees.vue";
import editEmployee from "src/pages/Employees/EditEmployee.vue";

import Notifications from "src/pages/Notifications.vue";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword
  },
  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/overview",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview
      },
      {
        path: "user",
        name: "User",
        component: UserProfile
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "employees/add",
        name: "Add Employees",
        component: AddEmployees
      },
      {
        path: "employees/edit/:rfid",
        name: "Edit Employees",
        component: editEmployee
      },
      {
        path: "employees",
        name: "Employees",
        component: Employees
      }
    ]
  },

  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
