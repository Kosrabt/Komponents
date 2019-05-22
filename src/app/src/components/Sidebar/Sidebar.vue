<template>
  <div class="workspace-panel">
    <div class="workspace">
      <div class="workspace-header">Components</div>
      <div class="workspace-content">
        <slot></slot>       
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {  
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
  }
}
</style>
