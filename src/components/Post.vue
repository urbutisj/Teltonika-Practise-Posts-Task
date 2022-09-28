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
import projectMixin from '../mixins/projectMixin';
export default {
    name: 'Post',
    props: ["post", 'showEditModal'],
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
        }
    },
    mixins: [projectMixin]
}
</script>

<style>

</style>