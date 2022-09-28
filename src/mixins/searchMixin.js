export default{
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