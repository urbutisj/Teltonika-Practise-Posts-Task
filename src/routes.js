import Posts from "./components/Posts.vue"
import SinglePostPage from './components/SinglePostPage.vue'

export default [
    {path: "/", component: Posts},
    {path: "/blog-post/:id", name:"single-post", component: SinglePostPage}
]