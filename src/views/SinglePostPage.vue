<template>
    <div id="single-blog">
        <h1 class="title">{{blog.title}}</h1>
        <article>{{blog.body}}</article>
        <button class="button is-warning" @click="changeModalState">Redaguoti</button>
        <button class="button is-danger" @click="deletePost(id)">Ištrinti</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import projectMixin from '../mixins/projectMixin';
    export default {
        props: ['postId'],
        data () {
            return {
                id: this.$route.params.id,
                blog: {}
            }
        },
        methods: {
            async fetchPostData() {
                try {
                    const post = await axios.get(`http://localhost:3000/posts/` + this.id);
                    this.blog = post.data;
                } catch (e) {
                    console.error(e);
                }
            },
            changeModalState() {
                this.$emit('changeState', this.id);
            },
            async deletePost(id) {
            try {
                await axios.delete('http://localhost:3000/posts/' + id);
                this.$router.push("/");
            } catch (e) {
                console.error(e);
            }
        }
            
        },
        async created() {
            await this.fetchPostData();  
        },
    mixins: [projectMixin]
}
</script>

<style>

</style>