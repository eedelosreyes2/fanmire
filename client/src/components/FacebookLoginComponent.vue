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

.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  ;
  border-radius: 20px;
  /* display:inline-block; */
}

.login {
  width: 200px;
  margin: auto;
}

.list-item:first-child {
  margin: 0;
}

.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
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
      @get-initial-status="refreshFB"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
    <div v-if="isConnected" class="information">
      <h1>My Facebook Information</h1>
      <div class="well">
        <div class="list-item">
          <img :src="picture">
        </div>
        <div class="list-item">
          <i>{{name}}</i>
        </div>
        <div class="list-item">
          <i>{{email}}</i>
        </div>
        <div class="list-item">
          <i>{{posts}}</i>
        </div>
      </div>
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
    refreshFB() {
      IdentityService.authenticateFB(this.FB.getAccessToken());
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.refreshFB()
    },
    onLogin() {
      this.isConnected = true
      this.refreshFB()
    },
    onLogout() {
      this.isConnected = false;
    }
  }
};

</script>
