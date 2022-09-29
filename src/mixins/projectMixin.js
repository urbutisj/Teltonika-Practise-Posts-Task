import Noty from 'noty';
export default{
    methods: {
        notify(type, text, layout = 'topRight'){
            new Noty({
                text,
                type,
                layout,
                theme: 'relax',
                timeout: 1500,
            }).show();
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