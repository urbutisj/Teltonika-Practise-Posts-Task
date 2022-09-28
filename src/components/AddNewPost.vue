<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                  <h4 class="title is-size-4">Pridėti naują straipsnį</h4> 
              </div>
              <div class="modal-body">
                <form>
                    <label class="label" for="title">Pavadinimas:</label>
                    <input type="text" id="title" v-model="blogpost.title" class="input mb-3" required />
                    <label class="label"  for="body">Turinys:</label>
                    <textarea id="body" v-model="blogpost.body" class="textarea mb-3"   required></textarea>
                    <label class="label" for="author">Autorius:</label>
                    <div class="select is-normal">
                        <select v-model="blogpost.author" required>
                            <option v-for="author in authors">{{author.name}}</option>
                        </select>
                    </div>
                </form>
              </div>
              <div class="modal-footer">
                  <button class="button is-primary" @click="post">
                    Išsaugoti
                  </button>
                  <button class="button" @click="$emit('close')">
                    Atšaukti
                  </button>
              </div>
            </div>
          </div>
          <div v-if="submitted" >
            <div class="notification is-primary is-light">
                <button class="delete"></button>
                Straipsnis sukurtas sėkmingai.
            </div>
          </div>
          
        </div>
      </transition>
</template>

<script>
    import axios from 'axios';
    import projectMixin from '../mixins/projectMixin'
    import moment from 'moment';
    export default {
      name: 'AddNewPost',
      // props: ['authors'],
      data() {
        return{
            authors: this.authors,
            blogpost: {
                title: "",
                body: "",
                author: "",
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                updated_at: ""
            },
            submitted: false,
        }
      },
      methods: {
       async post() {
            try {
                await axios.post(`http://localhost:3000/straipsniai`, {
                    title: this.blogpost.title,
                    body: this.blogpost.body,
                    author: this.blogpost.author,
                    created_at: this.blogpost.created_at,
                    updated_at: this.blogpost.updated_at
                })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.submitted = true;
                this.close();
                this.fetchPosts();
            } catch (e) {
                console.error(e);
            }
        },
        open() {
          this.$emit('open');
        },
        close() {
          this.$emit('close');
        },
      },
      mounted() {
        this.fetchAuthors();
      },
      mixins: [projectMixin]
    };
</script>
  


<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
    display: flex;
    flex-direction: column;
    margin: 2rem 0;
}


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.notification {
    position: absolute;
    right: 0;
    top: 0;
}


</style>