import Posts from "./views/Posts.vue"
import SinglePostPage from './views/SinglePostPage.vue'
import PageNotFound from './views/PageNotFound.vue'

export default [
    {path: "/", component: Posts},
    {path: "/blog-post/:id", component: SinglePostPage},
    {path: "*", component: PageNotFound }
]