<template>
    <div class="title-bar">    
      <img alt="Komponents" src="../assets/logo.png">
      <span class="menu" @click="save()" v-text="'Save \u21E9'" />
      <span class="menu" @click="load()" v-text="'Load \u21E7'" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default {
  methods: {
    save() {
      this.$store.state.bus.$emit('save')
    },
    load() {
      alert('Load is not implemented yet.')
    }
  }
}
</script>

<style lang="scss">
.menu {
  cursor: pointer;
  margin: 0 1em;
}

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
