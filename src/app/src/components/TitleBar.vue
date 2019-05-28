<template>
  <div class="title-bar">
    <img alt="Komponents" src="../assets/logo.png">
    <FileSelect ref="FileSelect" @fileLoaded="fileLoaded"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FileSelect from "./FileSelect.vue";

@Component({
  components: {
    FileSelect
  }
})
export default class TitleBar extends Vue {
  fileLoaded(event: Event) {}
}
</script>

<style lang="scss">
.title-bar {
  height: 48px;
  align-items: center;
  padding: 8px 32px;
  position: relative;
  z-index: 20;
  box-shadow: 0 2px 12px 0 rgba(8, 16, 24, 0.5);
  display: flex;
  background: #141d26;
  color: white;
}
</style>
