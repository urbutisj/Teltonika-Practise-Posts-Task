<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
                <h4 class="title is-size-4">Redaguoti straipsnį</h4> 
            </div>
            <div class="modal-body">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <ValidationProvider :custom-messages="{ required: customMessages.titleMessage }" rules="required" v-slot="{ classes, errors}">
                      <div :class="classes">
                        <label class="label" for="title">Pavadinimas:</label>
                        <input type="text" id="title" v-model="postData.title" class="input mb-3" />
                        <span>{{ errors[0] }}</span>
                      </div>
                  </ValidationProvider> 
                  <ValidationProvider :custom-messages="{ required: customMessages.bodyMessage }"  rules="required" v-slot="{ classes,errors }">
                      <div :class="classes">
                        <label class="label"  for="body">Turinys:</label>
                        <textarea id="body" v-model="postData.body" class="textarea mb-3"></textarea>
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <div class="action-buttons">
                    <button class="button is-primary" type="submit" @click="emitResponse(true, 'Straipsnis atnaujintas sėkmingai!', 'is-primary')">
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
  import moment from 'moment';
  export default {
    name: 'AddNewPost',
    props: [ 'postId', 'fetchPosts', 'fetchPostData', 'postData'],
    data() {
      return{
          id : this.postId,
          customMessages: {
              titleMessage: 'Įrašykite straipsnio pavadinimą.',
              bodyMessage: 'Įkelkite turinio tekstą.',
          }
      }
    },
    methods: {
      async put() {
        try {
          await this.$axios.put(this.$api_url + `/posts/` + this.id, {
              title: this.postData.title,
              body: this.postData.body,
              author: this.postData.author,
              created_at: this.postData.created_at,
              updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
          });
          // this.notify('success', 'Straipsnis atnaujintas sėkmingai!');
          if(this.$route.path == "/") {
              this.fetchPosts();
              console.log("Update from main page")
          } else {
              this.fetchPostData(this.id);
              console.log("Update from single post page")
          }
          this.close();
        } catch (e) {
          console.error(e);
        }
      },
      onSubmit () {
          this.put();
      },
      close() {
        this.$emit('close');
      },
      emitResponse(value, message, colour) {
          this.$emit("confirmAction", {value, message, colour})
      }
    },
    async created() {
        await this.fetchPostData(this.id);
    },
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