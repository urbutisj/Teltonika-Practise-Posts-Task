<template>
    <div id="single-blog">
        <h1 class="title">{{blog.title}}</h1>
        <article>{{blog.body}}</article>
        <button class="button is-warning">Redaguoti</button>
        <button class="button is-danger" @click="deletePost(id)">Ištrinti</button>
    </div>
</template>

<script>
    import projectMixin from '../mixins/projectMixin';
    export default {
        data () {
        return {
            blog: {}
        }
    },
    created() {
        this.singlePostPage()    
    },
    mixins: [projectMixin]
}
</script>

<style>

</style>