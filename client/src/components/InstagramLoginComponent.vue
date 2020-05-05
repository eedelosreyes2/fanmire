<style scoped>
#insta {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
  -webkit-background-clip: text;
          background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
}

.instagram {
    text-align: left;
}

</style>

<template>
    <div class="instagram">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
      <li><a target="_blank" href="https://localhost:5000/api/identity/instagram/oauth"><i class="fa fa-instagram" id="insta" aria-hidden="true"></i></a></li>
    </div>
</template>

<script>
    export default {
        name: 'InstagramLoginComponent',
    }
</script>
