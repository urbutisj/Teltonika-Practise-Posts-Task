<template>
    <section class="section posts">
        <div class="container">
            <h1 class="title">Straipsniai</h1>
            <input type="text" v-model="search" class="input mb-3" placeholder="Straipsnių paiešką..."/>
            <div class="columns" v-if="posts.length > 0">
                <div class="column post is-half" v-for = "post in pageOfItems" :key="post.id">
                    <post 
                        class="box" 
                        :fetchPosts="fetchPosts"  
                        :post="post" 
                        @changeState="updateEditModalState" 
                        v-on:postId="updateEditModalState"
                    />
                </div>
                <div class="pagination-row">
                    <app-pagination 
                        :items="filteredBlogs" 
                        :pageSize="10"
                        @changePage="onChangePage"
                        :labels="customLabels"
                        >
                    </app-pagination>
                </div>
            </div>
            <div v-else>
                <h2>Straipsnių nerasta.</h2>
            </div>
            
        </div>
    </section>
    
</template>

<script>
    import JwPagination from 'jw-vue-pagination';
    import Post from '../components/Post.vue';
    import projectMixin from '../mixins/projectMixin';

    const customLabels = {
                first: "<<",
                last: ">>",
                previous: "<",
                next: ">"
    };

    export default {
        name: 'Posts',
        props: ['updateEditModalState', 'fetchPosts', 'posts'],
        components: {
            'post' : Post,
            'app-pagination': JwPagination
    },
    data() {
        return {
            search: '',
            pageOfItems: [],
            customLabels
            
        }
    },
    methods: {
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
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