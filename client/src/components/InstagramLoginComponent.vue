

<template>
    <div>
        <mdb-btn class="btn-ins" icon="instagram" tag="a" role="button" href="http://localhost:5000/api/identity/instagram/oauth">Instagram</mdb-btn>
    </div>
</template>


<script>
    import { mdbBtn } from 'mdbvue';
    export default {
        name: 'InstagramLoginComponent',
        components: {
            mdbBtn
        }
    }
</script>
