
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import TitleBar from "./components/TitleBar.vue";
import MainContent from "./components/MainContent.vue";

export default {
  name: "app",
};
</script>


<style lang="scss">
html,
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  background-image: linear-gradient(170deg, #212b35, #081018);
}
#main {
  animation: FadeInAnim 500ms ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
