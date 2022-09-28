import axios from 'axios';
export default{
    data() {
        return {
            posts: [],
            authors: [],
        }
    },
    methods: {
        async fetchPosts() {
            try {
                const posts_res = await axios.get(`http://localhost:3000/straipsniai`);
                this.posts = posts_res.data;
                console.log(this.posts);
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
        async deletePost(id) {
            try {
                await axios.delete('http://localhost:3000/straipsniai/' + id);
                if(this.$route.path == "/") {
                    this.fetchPosts();
                } else {
                    this.$router.push("/");
                    this.fetchPosts()
                }
                
            } catch (e) {
                console.error(e);
            }
        }
    }
}