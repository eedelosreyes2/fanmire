<template>
<div id="app">
    <img alt="Fanmire logo" src="./assets/Fanmire_Icon_Horizontal_Red_400.png">
    <!--PostComponent /> -->
    <MainFeedComponent />
</div>
</template>

<script>
//import PostComponent from './components/PostComponent.vue';
import MainFeedComponent from './components/MainFeedComponent.vue';

export default {
    name: 'app',
    components: {
        //PostComponent,
        MainFeedComponent
    }
};

</script>
