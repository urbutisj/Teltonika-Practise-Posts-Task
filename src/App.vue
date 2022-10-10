<template>
  <div id="app">
    <app-header  @changeState="changeModalState"/>
    <notification @confirmAction="messageHandler" :isShowing="isShowing" :message="message" :colour="colour">{{message}}</notification>
    <app-new-post-modal 
      v-if="showAddModal" 
      @close="showAddModal = false" 
      @confirmAction="messageHandler"
      :fetchPosts="fetchPosts"
    />
    <app-edit-post-modal 
      v-if="showEditModal"
      @close="showEditModal = false"
      @confirmAction="messageHandler"
      :fetchPosts="fetchPosts"
      :fetchPostData="fetchPostData"
      :postData="postData"
      :postId="postId"  
      />
    <router-view
      :fetchPosts="fetchPosts" 
      :fetchPostData="fetchPostData"
      :posts="posts"
      :updateEditModalState="updateEditModalState"
      :messageHandler="messageHandler"
      @confirmAction="messageHandler"
      @changeState="updateEditModalState"
      :postData="postData" > 
    </router-view>
    <app-footer />
    
  </div>
</template>

<script>
  import Header from "./components/Header.vue"
  import AddNewPostModal from './components/AddNewPost.vue';
  import EditPostModal from './components/EditPost.vue';
  import Footer from "./components/Footer.vue"
  import Notification from "./components/Notification.vue"
  import mixins from "./mixins/projectMixin"
  export default {
    components: {
      'app-header' : Header,
      'app-new-post-modal' : AddNewPostModal,
      'app-edit-post-modal' : EditPostModal,
      'app-footer' : Footer,
      'notification' : Notification
    },
    data() {
        return {
            posts: {},
            postData: {},
            showAddModal: false,
            showEditModal: false,
            postId: null,
        }
    },
    methods: {
      changeModalState(state) {
        this.showAddModal = state;
      },
      messageHandler(state) {
        this.isShowing = state.value;
        this.message = state.message;
        this.colour = state.colour;
      },
      updateEditModalState(state) {
        this.showEditModal = state;
        this.postId = state;
      },
      async fetchPosts() {
        try {
            const posts_res = await this.$axios.get(this.$api_url + `/posts`);
            this.posts = posts_res.data;
        } catch (e) {
            console.error(e);
        }
      },
      async fetchPostData(id) {
        try {
            const post = await this.$axios.get(this.$api_url + '/posts/' + id);
            this.postData = post.data;
        } catch (e) {
            console.error(e);
        }
      },
    },
    mixins: [mixins]
  }
</script>

<style>
  header {
    background: linear-gradient(90deg,#00203F 0%,rgba(0,41,82,0.97) 53.12%,rgba(0,58,115,0.96) 82.9%,rgba(0,74,151,0.96) 100%);
  }
</style>
