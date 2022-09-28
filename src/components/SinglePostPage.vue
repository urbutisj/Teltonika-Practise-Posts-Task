<template>
    <div id="single-blog">
        <h1 class="title">{{blog.title}}</h1>
        <article>{{blog.body}}</article>
        <button class="button is-warning">Redaguoti</button>
        <button class="button is-danger" @click="deletePost(id)">Ištrinti</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import projectMixin from '../mixins/projectMixin';
    export default {
        data () {
        return {
            id: this.$route.params.id,
            blog: {}
        }
    },
    async created() {
        try {
            const post = await axios.get(`http://localhost:3000/straipsniai/` + this.id);
            this.blog = post.data;
        } catch (e) {
            console.error(e);
        }
    },
    mixins: [projectMixin]
}
</script>

<style>

</style>