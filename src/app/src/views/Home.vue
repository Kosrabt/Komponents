<template>
  <div id="main">
    <title-bar/>
   <KomponentView></KomponentView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TitleBar from "@/components/TitleBar.vue";
import KomponentView from "@/components/KomponentView.vue";

@Component({
  components: {
    TitleBar,
    KomponentView,
  }
})
export default class Home extends Vue {}
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
}
 
</style>

