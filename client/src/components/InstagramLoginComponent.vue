<style scoped>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
.fa {
  padding: 20px;
  font-size: 30px;
  width: 50px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
}

.fa-instagram {
  background: #125688;
  color: white;
}

</style>

<template>
  <div class="instagram-login">
      <a class="fa fa-instagram" href="http://localhost:5000/api/identity/instagram/oauth">Instagram</a>
  </div>
</template>

<script>
  export default {
    name: 'InstagramLoginComponent.vue',
  };
</script>
