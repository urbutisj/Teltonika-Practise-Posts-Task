<template>
    <div>
        <h2 class="title">{{post.title}}</h2>
        <p><span>Autorius:</span> {{post.author}}</p>
        <div class="my-2" v-if="post.created_at > post.updated_at">
            <p><span>Sukurta:</span> {{ post.created_at }}</p>
        </div>
        <div class="my-2" v-else>
            <p><span>Atnaujinta:</span> {{ post.updated_at }}</p>
        </div>
        <div class="action-buttons">
            <button @click="changeRoute('/blog-post/' + post.id)" class="button is-link" exact>Daugiau</button>
            <button class="button is-warning"  @click="changeModalState">Redaguoti</button>
            <button type="button" class="button is-danger" @click="deletePost(post.id); emitResponse(true, 'Straipsnis ištrintas sėkmingai!', 'is-danger')">Ištrinti</button>
        </div>
    </div>
</template>

<script>
import projectMixins from '../mixins/projectMixin';
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
        emitResponse(value, message, colour) {
          this.$emit("confirmAction", {value, message, colour})
        }
    },
    mixins: [projectMixins]
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