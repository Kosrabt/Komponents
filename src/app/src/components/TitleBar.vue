<template>
  <div class="title-bar">
    <img alt="Komponents" src="../assets/logo.png">
    <FileSelect ref="FileSelect" @fileLoaded="fileLoaded"/>
    <button @click="ClearLocalStorage">Clear local storage</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FileSelect from "./FileSelect.vue";
import {vxm} from "@/store";
import { DataLoader } from '../DataLoader';

@Component({
  components: {
    FileSelect
  }
})
export default class TitleBar extends Vue {
  fileLoaded(event: Event) {}

  ClearLocalStorage()
  {
    vxm.network.LoadComponent(new DataLoader().LoadDummyData());
  }
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
