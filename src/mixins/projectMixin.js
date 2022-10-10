export default{
    data(){
        return {
            isShowing: false,
            message: "",
            colour: ""
        }
    },
    methods: {
        async deletePost(id) {
            if(confirm('Ar tikrai norite ištrinti šį straipsnį?')){
                try {
                    await this.$axios.delete(this.$api_url + `/posts/` + id);
                    if(this.$route.path == "/") {
                        this.fetchPosts();
                    } else {
                        this.$router.push("/");
                    }    
                } catch (e) {
                    console.error(e);
                }
            }
            
        },
        toggleNotification() {
            this.isShowing = !this.isShowing;
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