<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                  <h4 class="title is-size-4">Pridėti naują straipsnį</h4> 
              </div>
              <div class="modal-body">
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(onSubmit)">
                    <ValidationProvider :custom-messages="{ required: customMessages.titleMessage }" rules="required" v-slot="{ classes, errors}">
                      <div :class="classes">
                        <label class="label" for="title">Pavadinimas:</label>
                        <input type="text" id="title" v-model="blogpost.title" class="input mb-3"/>
                        <span>{{ errors[0] }}</span>
                      </div>
                      
                    </ValidationProvider> 
                    <ValidationProvider :custom-messages="{ required: customMessages.bodyMessage }"  rules="required" v-slot="{ classes,errors }">
                      <div :class="classes">
                        <label class="label"  for="body">Turinys:</label>
                      <textarea id="body" v-model="blogpost.body" class="textarea mb-3"></textarea>
                      <span>{{ errors[0] }}</span>
                    </div>
                      
                    </ValidationProvider>
                    <ValidationProvider :custom-messages="{ required: customMessages.authorMessage }"   rules="required" v-slot="{classes, errors }">
                      <div :class="classes">
                        <label class="label" for="author">Autorius:</label>
                        <div class="select is-normal">
                            <select v-model="blogpost.author">
                                <option v-for="author in authors">{{author.name}}</option>
                            </select>
                        </div>
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                    <div class="action-buttons">
                      <button class="button is-primary" @click="emitResponse(true, 'Straipsnis sukurtas sėkmingai!', 'is-primary')" type="submit">
                        Išsaugoti
                      </button>
                      <button class="button" @click.prevent="$emit('close')">
                        Atšaukti
                      </button>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
    import notify from '../mixins/projectMixin';
    import moment from 'moment';
    export default {
      name: 'AddNewPost',
      props: ['fetchPosts'],
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
            customMessages: {
              titleMessage: 'Įrašykite straipsnio pavadinimą.',
              bodyMessage: 'Įkelkite turinio tekstą.',
              authorMessage: 'Pasirinkite autorių.'
            }
        }
      },
      methods: {
        async fetchAuthors() {
            try {
                const authors_res = await this.$axios.get(this.$api_url + `/authors`);
                this.authors = authors_res.data;
                console.log(this.authors);
            } catch (e) {
                console.error(e);
            }
        },
        async post() {
          try {
              await this.$axios.post(this.$api_url + `/posts`, {
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
              this.close();
              this.fetchPosts();
          } catch (e) {
              console.error(e);
          }
        },
        onSubmit () {
          this.post();
        },
        close() {
          this.$emit('close');
        },
        emitResponse(value, message, colour) {
          this.$emit("confirmAction", {value, message, colour})
        }
      },
      async created() {
        await this.fetchAuthors();
      },
      mixins: [notify]
    };
</script>
  


<style scoped>

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
.action-buttons{
  margin-top: 1rem;
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

div.is-invalid span {
  color: #FF8181;
}

div input:active,
div input:focus,
div textarea:active,
div textarea:focus,
div select:active,
div select:focus {
  outline: none!important;
  border-color: #b5b5b5!important;
  box-shadow: none!important;
}

div.is-invalid input,
div.is-invalid textarea,
div.is-invalid select {
  border: 1px #FF8181 solid;
}

div.is-valid span {
  color: #BCF5BC;
}

div.is-valid input,
div.is-valid textarea,
div.is-valid select  {
  border: 1px #BCF5BC solid;
}

span {
  display: block;
}

</style>