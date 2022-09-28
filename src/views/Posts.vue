<template>
    <section class="section posts">
        <div class="container">
            <h1 class="title">Straipsniai</h1>
            <input type="text" v-model="search" class="input mb-3" placeholder="Straipsnių paiešką..."/>
            <div class="columns" v-if="posts.length > 0">
                <div class="column post is-half" v-for = "post of filteredBlogs" :key="post.id">
                    <post class="box" :fetchPosts="fetchPosts"  :post="post" v-on:changeState="updateEditModalState"/>
                </div>
            </div>
            <div v-else>
                <h2>Straipsnių nerasta.</h2>
            </div>
            
        </div>
    </section>
    
</template>

<script>
    
    import Post from '../components/Post.vue';
    import projectMixin from '../mixins/projectMixin';
    export default {
        name: 'Posts',
        props: ['updateEditModalState', 'fetchPosts', 'posts'],
        components: {
            'post' : Post
    },
    data() {
        return {
            search: '',
        }
    },
    async mounted() {
        await this.fetchPosts();
        console.log(this.posts);
    },
    mixins: [projectMixin ]
    
};
</script>

<style>
.columns {
    flex-wrap: wrap;
}
.column {
    flex: 0 0 50%;
}
</style>