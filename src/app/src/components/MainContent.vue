<template>
  <div class="main-content">
    <Sidebar>
      <SidebarButton><router-link to="/">Graph</router-link></SidebarButton>
      <SidebarButton><router-link to="/about">Info</router-link></SidebarButton>
    </Sidebar>
    <div class="workspace">
     <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Sidebar from './Sidebar/Sidebar.vue';

@Component({
  components: {
    Sidebar,
  },
})
export default class MainContent extends Vue {}
</script>

<style lang="scss" scoped>
  .main-content {
      display: flex;
      flex: 1;
      position: relative;
      
      .workspace
      {
        width:100%;
      }
  }
</style>
