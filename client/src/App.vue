<template>
<div id="app">
  <img alt="Fanmire logo" src="./assets/Fanmire_Icon_Horizontal_Red_400.png">
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
