<template>
<footer class="footer">
  <div class="content has-text-centered">
    <p class="copyrights">
        ©&nbsp<span>{{year}}.</span>&nbspAll rights reserved.&nbsp 
    </p>
    <img src="../assets/teltonika_logo.svg" width="112" height="28" />
  </div>
</footer>
</template>

<script>
    export default{
        data() {
            return {
                year: new Date().getFullYear()
            }
            
        }
    }

</script>

<style>
footer {
    background: linear-gradient(90deg,#00203F 0%,rgba(0,41,82,0.97) 53.12%,rgba(0,58,115,0.96) 82.9%,rgba(0,74,151,0.96) 100%);
    padding: 1.5rem 1.5rem;
}
 
p.copyrights {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}
.copyrights img {
    margin-left: 10px;
    margin-top: 3px;
}
</style>