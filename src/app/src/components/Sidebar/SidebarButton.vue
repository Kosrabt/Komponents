<template>
  <div class="component" @click="onClick">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component as VueComponent, Prop, Vue, Emit } from "vue-property-decorator";

@VueComponent
export default class SidebarButton extends Vue 
{
  
  @Emit('click')
  private onClick(){}
}
</script>

<style lang="scss" scoped>
.workspace {
  .component {
    padding: 20px 20px;
    border-top: 1px solid #212b35;
    cursor: pointer;
  }
  .component:last-child {
    border-bottom: 1px solid #212b35;
  }
}
</style>
