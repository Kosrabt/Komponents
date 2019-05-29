<template>
  <label class="file-select">
    <div class="select-button">
      <span>Import</span>
    </div>
    <input type="file" @change="handleFileChange">
  </label>
</template>

<script lang="ts">
import {  Component as VueComponent, Prop, Vue, Emit } from "vue-property-decorator";

@VueComponent
export default class FileSelect extends Vue {  
  handleFileChange(ev: any): void { 
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}
</style>