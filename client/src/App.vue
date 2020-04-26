<template>
<div id="app">
    <img alt="Fanmire logo" src="./assets/Fanmire_Icon_Horizontal_Red_400.png">
    <MainFeedComponent />
    <FacebookLoginComponent />
</div>
</template>

<script>
import MainFeedComponent from './components/MainFeedComponent.vue';
import FacebookLoginComponent from './components/FacebookLoginComponent';

export default {
    name: 'app',
    components: {
        MainFeedComponent,
        FacebookLoginComponent
    }
};

</script>
