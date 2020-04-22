<style scoped>

div.container {
    max-width: 800px;
    margin: 0 auto;
}

p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
}

div.post {
    position: relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
}

div.created-at {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
}

p.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
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

        <p>
          {{ posts }}
        </p>

        <div class="posts-container">
            <div class="post" v-for="(post, index) in posts" v-bind:item="post" v-bind:index="index" v-bind:key="post._id" v-on:dblclick="deletePost(post._id)">
                <p class="text">{{ post.text }}</p>
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
