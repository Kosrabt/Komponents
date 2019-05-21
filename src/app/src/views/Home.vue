<template>
  <div class="home">
    <Workspace></Workspace>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Workspace from '../components/Network/Workspace.vue';

@Component({
  components: {
    Workspace,
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss">
  .home
  {
    width:100%;
    height:100%;
  }
</style>

