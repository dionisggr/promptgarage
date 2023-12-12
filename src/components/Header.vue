<template>
  <v-toolbar
    color="grey-lighten"
    dark
    fixed
    app
    width="100%"
    class="text-sm"
    style="position: fixed; z-index: 10"
  >
    <div
      class="mx-auto"
      style="display: flex; align-items: center; width: 100%; max-width: 1200px"
    >
      <v-toolbar-title
        class="title text-lg ml-4 flex"
        @click="$router.push('/')"
      >
        <router-link
          style="
            text-decoration: none;
            color: inherit;
            padding: 5px;
            display: block;
          "
          to="/"
          >PromptGarage
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Hamburger Button -->
      <button class="hamburger-button" v-if="isMobile" icon @click.stop="drawer = !drawer">
        <span style="font-weight: bold; font-size: 2rem">&#9776;</span>
      </button>

      <!-- Desktop Buttons -->
      <div v-else class="mr-4">
        <a href="https://github.com/dionisggr/promptgarage" target="_blank">
          <v-btn text class="text-sm px-4" style="color: #303030">
            GitHub
          </v-btn>
        </a>
        <router-link to="/prompts">
          <v-btn
            v-if="$store.state.isLoggedIn"
            text
            class="text-sm px-4"
            style="color: #303030"
          >
            Prompts
          </v-btn>
        </router-link>
        <v-btn
          v-if="$store.state.isLoggedIn"
          text
          class="text-sm px-4"
          style="color: #303030"
          @click="logout"
        >
          Logout
        </v-btn>
        <v-btn
          v-if="!$store.state.isLoggedIn"
          text
          class="text-sm px-4"
          style="color: #303030"
          @click="setupDemo"
        >
          Demo
        </v-btn>
        <v-btn
          v-if="!$store.state.isLoggedIn"
          text
          class="text-sm px-4"
          style="color: #303030"
          @click="login"
        >
          Login
        </v-btn>
      </div>
    </div>
  </v-toolbar>

<v-navigation-drawer
  v-model="drawer"
  app
  temporary
  location="right"
  class="text-center text-lg slow-transition mobile-nav-drawer"
>
  <!-- Website Title -->
  <h2 class="menu-title">PromptGarage</h2>

  <!-- Close Button -->
  <div class="close-menu" @click="drawer = false">&#10005;</div>


    <v-list class="mt-4">
      <v-list-item class="mt-2" @click="goToGithub">
        <v-icon left>mdi-github</v-icon>
        <v-list-item-title>GitHub</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="$store.state.isLoggedIn"
        @click="$router.push('/prompts')"
      >
        <v-icon left>mdi-note-text</v-icon>
        <v-list-item-title>Prompts</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="$store.state.isLoggedIn" class="mt-2" @click="logout">
        <v-icon left>mdi-login</v-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!$store.state.isLoggedIn" class="mt-2" @click="setupDemo()">
        <v-icon left>mdi-login</v-icon>
        <v-list-item-title>Demo</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!$store.state.isLoggedIn" class="mt-2" @click="login">
        <v-icon left>mdi-login</v-icon>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  mounted() {
    this.checkMobile();

    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  },
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      drawer: false,
    };
  },
  methods: {
    setupDemo() {
      window.Clerk.user = {
        id: 'demo',
      };
      this.drawer = false;

      this.$store.dispatch('login');
      this.$store.dispatch('alert', 'Logged in as demo user');
    },
    login() {
      this.drawer = false;

      window.Clerk.openSignIn();
    },
    logout() {
      this.drawer = false;

      window.Clerk?.signOut();
      this.$store.dispatch('logout');
      this.$store.dispatch('alert', 'Logged out successfully');
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    goToGithub() {
      this.drawer = false;

      window.open('https://github.com/dionisggr/promptgarage', '_blank');
    }
  },
};
</script>

<style>
.v-toolbar-title {
  font-size: 1.4rem;
  font-weight: bolder;
  cursor: pointer;
  min-width: fit-content;
  color: #2e2e2e;
}

.v-toolbar-title:hover {
  color: #727272;
}

/* Hamburger and Desktop Buttons */
.v-btn {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

/* Mobile Navigation Drawer */
.mobile-nav-drawer {
  background-color: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(6px);
  padding-top: 60px;
}

.close-menu {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
}

.v-list-item {
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: rgba(180, 180, 180, 0.1);
}

.v-list-item-title {
  font-weight: 500;
  font-size: 1.15rem;
  margin-bottom: 1.5rem;
}

.v-icon {
  color: #555;
  margin-right: 10px;
  font-size: 1.25rem;
}

.hamburger-button {
  margin: 1rem;
  margin-bottom: 1.5rem;
}

.menu-title {
  position: absolute;
  top: 0.9rem;
  left: 1rem;
  font-size: 1.1rem;
}
</style>
