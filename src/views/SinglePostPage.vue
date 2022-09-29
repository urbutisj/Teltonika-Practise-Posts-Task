<template>
    <div id="single-blog" class="container">
        <h1 class="title">{{postData.title}}</h1>
        <div class="my-2" v-if="postData.created_at > postData.updated_at">
            <p><span>Sukurta:</span> {{ postData.created_at | formatDate }}</p>
        </div>
        <div class="my-2" v-else>
            <p><span>Atnaujinta:</span> {{ postData.updated_at | formatDate }}</p>
        </div>
        <p class="my-2"><span>Sukūrė:</span> {{postData.author}}</p>
        <p class="body-text">{{postData.body}}</p>
        <div class="action-buttons">
            <button class="button is-warning" @click="changeModalState">Redaguoti</button>
            <button class="button is-danger" @click="deletePost(id)">Ištrinti</button>
        </div>
    </div>
</template>

<script>
    import projectMixin from '../mixins/projectMixin';
    export default {
        props: ['fetchPostData', 'postData'],
        data () {
            return {
                id: this.$route.params.id
            }
        },
        methods: {
            changeModalState() {
                this.$emit('changeState', this.id);
            },            
        },
        async created() {
            await this.fetchPostData(this.id);
            console.log(this.postData.id);
        },
    mixins: [projectMixin]
}
</script>

<style>
#single-blog{
    padding: 3rem 0;
}
p span {
    font-weight: bold;
} 

.body-text {
    margin: 2rem 0;
}

.action-buttons button:not(:last-child){
    margin-right: .5rem;
}
</style>