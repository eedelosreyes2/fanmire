<template>
<div id="app">
    <img alt="Fanmire logo" src="./assets/Fanmire_Icon_Horizontal_Red_400.png">
    <MainFeedComponent />
    <FacebookLoginComponent />
    <InstagramLoginComponent />
</div>
</template>

<script>
import MainFeedComponent from './components/MainFeedComponent.vue';
import FacebookLoginComponent from './components/FacebookLoginComponent';
import InstagramLoginComponent from './components/InstagramLoginComponent';

export default {
    name: 'app',
    components: {
        MainFeedComponent,
        FacebookLoginComponent,
        InstagramLoginComponent
    }
};

</script>
