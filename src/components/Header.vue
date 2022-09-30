<template>
    <header>
        <div class="container">
            <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="/">
                <img src="../assets/teltonika_logo.svg" width="112" height="28">
              </a>
          
              <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
          
            <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-start">
                <a class="navbar-item" @click="changeModalState">
                  Naujas straipsnis  
                </a>    
              </div>
            </div>
          </nav>
        </div>
    </header>
</template>

<script>

export default {
    data() {
      return{
      }
    },
    methods: {
      changeModalState() {
        this.$emit('changeState', true);
      }
    }
}
</script>

<style>
  .navbar {
      justify-content: space-between;
      background: transparent;
  }

  .navbar-menu {
    flex-grow: 0;
  }
  .navbar-item, .navbar-link ,
  .navbar-burger span{
      color: #fff;
  }
</style>