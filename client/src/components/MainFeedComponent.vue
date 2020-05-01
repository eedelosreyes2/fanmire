<style scoped>

* {
    font-family: Arial, Helvetica, sans-serif;
}

div.container {
    max-width: 800px;
    margin: 0 auto;
}

div.post {
    position: relative;
    border: 1px solid red;
    border-radius: 20px;
    background-color: #ffffff;
    padding: 10px 10px 20px 10px;
    margin-bottom: 15px;
}

img.content_image {
    display: block;
    height: auto;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    max-height: 400px;
    max-width: 600px;
    padding: 15px;
}

p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
}

p.social_media {
    color: grey;
    float: right;
    font-size: 10px;
    font-weight: 700;
    margin: 0;
    padding: 0;
}

p.user_name {
    color: red;
    display: inline;
    font-size: 30px;
    font-weight: 700;
    margin: 0;
    padding: 0;
}

p.user_handle {
    color: grey;
    display: inline;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    padding-bottom: 20px;
}

p.created_date {
    color: black;
    font-size: 12px;
    font-weight: 200;
    margin: 0;
    padding-bottom: 20px;
    text-indent: 5px;
}

p.text {
    font-size: 18px;
    font-weight: 150;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-top: 0px;
    padding: 0px;
}

p.likes {
    color: grey;
    display: inline;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 0px;
    margin-left: 20px;
    margin-right: 20px;
    padding: 0px;
}

</style>

<template>

<div class="container">
    <h1>Find Celebrities</h1>
    <div class="create-post">
        <label for="create-post">I wanna find...</label>
        <select v-model="celebrity" v-on:change="getPosts($event.target.value)">
          <option
            v-for="celebrity in celebrities"
            v-bind:key="celebrity.id"
          >{{celebrity}}</option>
        </select>
        <hr>

        <div class="posts-container">
            <div class="post" v-for="(post, index) in posts" v-bind:key="index">
                <p class="social_media">via {{ post.social_media }}</p>
                <p class="user_name">{{ post.user_name }}</p>
                <p class="user_handle"> {{ post.user_handle }}</p>
                <p class="created_date">{{ post.created_date }}</p>
                <p class="text">{{ post.content_text }}</p>

                <div v-for="(image, image_index) in post.content_images" v-bind:key="image_index">
                  <img class="content_image" :src="image"/>
                </div>

                <p class="likes">Likes: {{ post.likes }}</p>
                <p class="likes">{{ post.retweets }}</p>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import MainFeedService from '../MainFeedService';

export default {
    name: 'MainFeedComponent',
    data() {
        return {
            celebrities: ["Fanmire"], // add more later
            posts: [],
            error: ''
        }
    },
    methods: {
      async getPosts(celebrity) {
        try {
            this.posts = await MainFeedService.getPosts(celebrity);
        } catch (err) {
            this.error = err.message;
        }
        console.log(this.posts);
      }
    }
};

</script>
