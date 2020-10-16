<template>
  <v-app id="inspire">
    <!-- NAVIGATION -->
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      clipped
      app
      dark
      :src="bg"
    >
      <v-divider></v-divider>

      <v-list shaped>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="{ name: item.name_route }"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- APP BAR -->
    <v-app-bar
      app
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :color="color"
    >
      <div class="d-flex align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
              v-on="on"
            ></v-app-bar-nav-icon>
          </template>
          <span>Click</span>
        </v-tooltip>
        <v-toolbar-title>Password Utility</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img
                :src="require('@/assets/profile.jpg')"
                alt="profile"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <span>Andrés Velásquez Delgado</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon large @click="handleLogout" v-on="on">
            <v-icon>fa-sign-out-alt</v-icon>
          </v-btn>
         </template>
        <span>Salir</span>
      </v-tooltip>
    </v-app-bar>

    <!-- CONTENT -->
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    background: true,
    color: "primary",
    colors: ["primary", "blue", "success", "red", "teal"],
    dialog: false,
    drawer: null,
    items: [
      {
        icon: "fa-user-graduate",
        text: "Aspirante",
        name_route: "dashboard.candidate"
      },
      {
        icon: "fa-key",
        text: "Passwords",
        name_route: "dashboard.password-utility"
      }
    ]
  }),
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  created() {
    //this.$store.dispatch("getAllUsers");
    console.log("created");
  },
  methods: {
    handleLogout() {
      window.localStorage.removeItem("authToken");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
