<template>
    <div  v-if="showConfirmationButtons" class="notification is-light" :class="colour">
        <strong>{{message}}</strong>
    </div>
</template>


<script>
    export default{
        props: {
            "isShowing": {
                type: Boolean,
                default: false
            },
            'message' : {
                type: String,
                default: 'Pranešimas'
            },
            'colour' : {
                type: String,
                default: 'is-info'
            }
        },
        data () {
            return {
                showConfirmationButtons: this.isShowing
            }
        },
        watch: { 
            isShowing: function(value) {
                this.showConfirmationButtons = value
            }
        }
    }
</script>

<style>
.notification {
    position: absolute;
    width: 300px;
    right: 0;
    top: 15px;
    z-index: 30;
    border-radius: 5px;
}
</style>