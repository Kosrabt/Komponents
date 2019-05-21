<template>
  <div class="component">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SidebarComponent extends Vue {}
</script>

<style lang="scss" scoped>
.workspace {
  .component {
    padding: 20px 20px;
    border-top: 1px solid #212b35;
  }
  .component:last-child {
    border-bottom: 1px solid #212b35;
  }
}
</style>
