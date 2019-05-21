<template>
  <div class="workspace-panel">
    <div class="workspace">
      <div class="workspace-header">Components</div>
      <div class="workspace-content">
       <SidebarComponent><router-link to="/">Home</router-link></SidebarComponent>
       <SidebarComponent><router-link to="/about">About</router-link></SidebarComponent>
      </div>
      <div class="workspace-footer">
        <div class="title">Add component</div>
        <div class="icon">+</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SidebarComponent from './SidebarComponent.vue';
@Component({
  components: {
    SidebarComponent,
  },
})
export default class Sidebar extends Vue {}
</script>

<style lang="scss" scoped>
.workspace-panel {
  width: 320px;
  border-right: 1px solid #111;
  background-color: #000000;

  .workspace {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .workspace-header {
      padding: 20px;
      padding-top: 24px;
      text-transform: uppercase;
    }
    .workspace-content {
      flex: 1;
    }
    .workspace-footer {
      padding: 20px;
      background-color: #2e2e2e;
      display: flex;

      .icon {
        display: block;
        margin-left: auto;
        margin-right: 24px;
      }
    }
  }
}
</style>
