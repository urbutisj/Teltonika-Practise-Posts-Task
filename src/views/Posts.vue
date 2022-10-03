<template>
    <section class="section posts">
        <div class="container">
            <h1 class="title">Straipsniai</h1>
            <input type="text" v-model="search" class="input mb-3" placeholder="Straipsnių paiešką..."/>
            <div class="columns" v-if="posts.length > 0">
                <div class="column post is-half" v-for = "post in currentPagePosts" :key="post.id" v-show="filteredBlogs.length > 1">
                    <post 
                        class="box" 
                        :fetchPosts="fetchPosts"  
                        :post="post" 
                        @changeState="updateEditModalState" 
                        v-on:postId="updateEditModalState"
                    />
                </div>
                <div class="pagination-row">
                    <pagination :filteredBlogs="filteredBlogs" :perPage="10" :currentPage="currentPage" @pagechanged="onPageChange"></pagination>
                </div>
            </div>
            <div v-else>
                <h2>Straipsnių nerasta.</h2>
            </div>
            
        </div>
    </section>
    
</template>

<script>
    import Pagination from '../components/Pagination.vue';
    import Post from '../components/Post.vue';
    import projectMixin from '../mixins/projectMixin';

    export default {
        name: 'Posts',
        props: ['updateEditModalState', 'fetchPosts', 'posts'],
        components: {
            'post' : Post,
            'pagination' : Pagination
    },
    data() {
        return {
            search: '',
            currentPage: 1,
            postsPerPage: 10,
        }
    },
    methods: {
        onPageChange(page) {
            console.log(page)
            this.currentPage = page;
        }
    },
    computed: {
    // computed property to set the items visible on current page
        currentPagePosts() {
            return this.filteredBlogs.slice((this.currentPage - 1) * this.postsPerPage, this.currentPage * this.postsPerPage)
        }
    },
    async mounted() {
        await this.fetchPosts();
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

.pagination-row {
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    display: flex;
}

.page-item:first-child .page-link {
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
}

.page-item:last-child .page-link {
  border-top-right-radius: .25rem;
  border-bottom-right-radius: .25rem;
}

.page-link{
    border: 1px solid #dee2e6;
}

.page-item.disabled .page-link {
  color: #6c757d;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>