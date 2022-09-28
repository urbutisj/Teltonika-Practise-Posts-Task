<template>
    <div>
        <h2>Pavadinimas: {{post.title}}</h2>
        <h5>Autorius: {{post.author}}</h5>
        <div v-if="post.created_at > post.updated_at">
            <p>Sukurta: {{ post.created_at | formatDate }}</p>
        </div>
        <div v-else>
            <p>Atnaujinta: {{ post.updated_at | formatDate }}</p>
        </div>
        <button @click="changeRoute('/blog-post/' + post.id)" class="button is-link" exact>Daugiau</button>
        <button class="button is-warning"  @click="changeModalState">Redaguoti</button>
        <button type="button" class="button is-danger" @click="deletePost(post.id); ">Ištrinti</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Post',
    props: ["post", 'showEditModal', 'fetchPosts'],
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        changeRoute(route) {
            this.$router.push(route);
        },
        changeModalState() {
            this.$emit('changeState', true);
        },
        async deletePost(id) {
            try {
                await axios.delete('http://localhost:3000/posts/' + id);
                await this.fetchPosts();
            } catch (e) {
                console.error(e);
            }
        }
    }
}
</script>

<style>

</style>