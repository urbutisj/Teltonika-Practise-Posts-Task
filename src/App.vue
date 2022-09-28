<template>
  <div id="app">
    <app-header v-on:changeState="updateAddModalState"/>
    <app-new-post-modal v-if="showAddModal" @close="showAddModal = false" :fetchPosts="fetchPosts"/>
    <app-edit-post-modal v-if="showEditModal" :fetchPosts="fetchPosts" :postId="postId" @close="showEditModal = false" :posts="posts" />
    <router-view :posts="posts" :fetchPosts="fetchPosts" v-bind:updateEditModalState="updateEditModalState" v-on:changeState="updateEditModalState"></router-view>
    <app-footer />
  </div>
</template>

<script>
  import axios from 'axios';
  import Header from "./components/Header.vue"
  import AddNewPostModal from './components/AddNewPost.vue';
  import EditPostModal from './components/EditPost.vue';
  import Footer from "./components/Footer.vue"
  export default {
    components: {
      'app-header' : Header,
      'app-new-post-modal' : AddNewPostModal,
      'app-edit-post-modal' : EditPostModal,
      'app-footer' : Footer
    },
    data() {
        return {
            posts: {},
            showAddModal: false,
            showEditModal: false,
            postId: null
        }
    },
    methods: {
      updateAddModalState(state) {
        this.showAddModal = state;
      },
      updateEditModalState(state) {
        this.showEditModal = state;
        this.postId = state;
        console.log(this.postId);
      },
      openModal() {
        this.classList.add('is-active');
      },
      async fetchPosts() {
          try {
              const posts_res = await axios.get(`http://localhost:3000/posts`);
              this.posts = posts_res.data;
          } catch (e) {
              console.error(e);
          }
      }
    }
  }
</script>

<style>
  header {
    background: linear-gradient(90deg,#00203F 0%,rgba(0,41,82,0.97) 53.12%,rgba(0,58,115,0.96) 82.9%,rgba(0,74,151,0.96) 100%);
  }
</style>
