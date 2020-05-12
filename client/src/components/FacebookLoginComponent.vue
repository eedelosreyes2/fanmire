<style scoped>

#app {
  display: flex;
  flex-direction: column;
  align-items: flex-start
}

.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.login {
  width: 200px;
  margin: auto;
}

.button {
  margin: auto;
}

</style>

<template>
  <div id="app">
    <facebook-login class="button"
      appId="207762313865032"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
    <div v-if="isConnected" class="information">
    </div>
  </div>
</template>

<script>
  import facebookLogin from 'facebook-login-vuejs'
  import IdentityService from '../IdentityService'
  export default {
    name: 'FacebookLoginComponent.vue',
    data() {
      return {
        isConnected: false,
        name: '',
        email: '',
        picture: '',
        posts: '',
        FB: undefined
        }
    },
    components: {
      facebookLogin
    },
    methods: {
    async refreshFB() {
      const fbPosts = await IdentityService.authenticateFB(this.FB.getAccessToken());
      console.log({ fbPosts });
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      console.log('sdk loaded');
      if (this.isConnected) this.refreshFB()
    },
    onLogin() {
    console.log('onLogin');
      this.isConnected = true
      this.refreshFB()
    },
    onLogout() {
      this.isConnected = false;
    }
  }
};

</script>
