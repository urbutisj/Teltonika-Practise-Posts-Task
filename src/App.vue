<template>
  <div id="app">
    <app-header v-on:changeState="updateAddModalState"/>
    <app-new-post-modal v-if="showAddModal" @close="showAddModal = false"/>
    <app-edit-post-modal v-if="showEditModal" @close="showEditModal = false" v-bind:posts="posts" />
    <router-view  v-bind:updateEditModalState="updateEditModalState" v-on:changeState="updateEditModalState"></router-view>
    <app-footer />
  </div>
</template>

<script>
  import Posts from "./components/Posts.vue"
  import Header from "./components/Header.vue"
  import AddNewPostModal from './components/AddNewPost.vue';
  import EditPostModal from './components/EditPost.vue';
  import Footer from "./components/Footer.vue"
  export default {
    components: {
      'app-header' : Header,
      'app-new-post-modal' : AddNewPostModal,
      'app-edit-post-modal' : EditPostModal,
      'posts' : Posts,
      'app-footer' : Footer
    },
    data() {
        return {
            showAddModal: false,
            showEditModal: false
        }
    },
    methods: {
      updateAddModalState(state) {
        this.showAddModal = state;
      },
      updateEditModalState(state) {
        this.showEditModal = state;
      },
      openModal() {
        this.classList.add('is-active');
      }
    }
  }
</script>

<style>
  header {
    background: linear-gradient(90deg,#00203F 0%,rgba(0,41,82,0.97) 53.12%,rgba(0,58,115,0.96) 82.9%,rgba(0,74,151,0.96) 100%);
  }
  </style>
