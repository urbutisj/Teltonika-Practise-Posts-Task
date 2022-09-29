import Noty from 'noty';
import axios from 'axios';
export default{
    data() {
        return {
            
        }
    },
    methods: {
        notify(type, text, layout = 'topRight'){
            new Noty({
                text,
                type,
                layout,
                theme: 'relax',
                timeout: 1500,
            }).show();
        },
        async deletePost(id) {
            if(confirm('Ar tikrai norite ištrinti šį straipsnį?')){
                try {
                    await axios.delete('http://localhost:3000/posts/' + id);
                    if(this.$route.path == "/") {
                        this.fetchPosts();
                        this.notify('success', 'Straipsnis ištrintas sėkmingai.');
                    } else {
                        this.$router.push("/");
                        this.notify('success', 'Straipsnis ištrintas sėkmingai.');
                    }    
                } catch (e) {
                    console.error(e);
                    this.notify('error', e.response.data.error);
                }
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