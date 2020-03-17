<template>
<div id="app">
  <img alt="Vue logo" src="./assets/logo.png">
  <PostComponent />
</div>
</template>

<script>
import PostComponent from './components/PostComponent.vue';

export default {
  name: 'app',
  components: {
    PostComponent
  }
};
</script>
