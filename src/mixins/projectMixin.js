import axios from 'axios';
export default{
    data() {
        return {
            id: this.$route.params.id,
            posts: [],
            authors: [],
            blog:{}
        }
    },
    methods: {
        async fetchPosts() {
            try {
                const posts_res = await axios.get(`http://localhost:3000/straipsniai`);
                this.posts = posts_res.data;
                // console.log(this.posts);
            } catch (e) {
                console.error(e);
            }
        },
        async fetchAuthors() {
            try {
                const authors_res = await axios.get(`http://localhost:3000/autoriai`);
                this.authors = authors_res.data;
                console.log(this.authors);
            } catch (e) {
                console.error(e);
            }
        },
        async singlePostPage() {
            try {
                const post = await axios.get(`http://localhost:3000/straipsniai/` + this.id);
                this.blog = post.data;
            } catch (e) {
                console.error(e);
            }
        },
        async deletePost(id) {
            try {
                await axios.delete('http://localhost:3000/straipsniai/' + id);
                if(this.$route.path == "/") {
                    await this.fetchPosts();
                } else {
                    this.$router.push("/");
                    this.fetchPosts()
                }
                
            } catch (e) {
                console.error(e);
            }
        }
    },
    computed: {
        filteredBlogs () {
            return this.posts.filter((blog) => {
                return blog.title.toLowerCase().includes(this.search.toLowerCase()) || 
                       blog.author.toLowerCase().includes(this.search.toLowerCase()) || 
                       blog.body.toLowerCase().includes(this.search.toLowerCase()) ;
            });
        }
    }
}