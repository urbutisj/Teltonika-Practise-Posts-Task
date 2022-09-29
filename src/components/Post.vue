<template>
    <div>
        <h2 class="title">{{post.title}}</h2>
        <p><span>Autorius:</span> {{post.author}}</p>
        <div class="my-2" v-if="post.created_at > post.updated_at">
            <p><span>Sukurta:</span> {{ post.created_at | formatDate }}</p>
        </div>
        <div class="my-2" v-else>
            <p><span>Atnaujinta:</span> {{ post.updated_at | formatDate }}</p>
        </div>
        <div class="action-buttons">
            <button @click="changeRoute('/blog-post/' + post.id)" class="button is-link" exact>Daugiau</button>
            <button class="button is-warning"  @click="changeModalState">Redaguoti</button>
            <button type="button" class="button is-danger" @click="deletePost(post.id); ">Ištrinti</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import notify from '../mixins/projectMixin';
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
            this.$emit('postId', this.post.id);
        },
        async deletePost(id) {
            try {
                await axios.delete('http://localhost:3000/posts/' + id);
                await this.fetchPosts();
                this.notify('success', 'Straipsnis ištrintas sėkmingai.');
            } catch (e) {
                console.error(e);
                this.notify('error', e.response.data.error);
            }
        }
    },
    mixins: [notify]
}
</script>

<style>
p span {
    font-weight: bold;
}

.action-buttons button:not(:last-child){
    margin-right: .5rem;
}
</style>