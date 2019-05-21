<template>
  <div class="workspace-window">
    <NetworkPlane :komponent = "selectedComponent">
    </NetworkPlane>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Komponent } from "@/models/Network/Komponent";
import NetworkPlane from "./NetworkPlane.vue";
import { Point } from '@/models/Network/Point';
import { Link } from '@/models/Network/Link';

@Component({
  components: {
    NetworkPlane
  }
})
export default class Workspace extends Vue {
  protected data() {      
    return {};
  }

  get selectedComponent()
  {
    var k1 = new Komponent("k1","root","Name1");
    var k2 = new Komponent("k2","root","Name2");
    var link = new Link("k1-k2", "Link", "k2");
    k1.Links.push(link);

    k1.Position = new Point(100,0);
    k2.Position = new Point(-100,0);

    var komponent = new Komponent("root","", "Root");
    komponent.Position = new Point(0,0);
    komponent.SubKomponents.push(k1, k2);

    return komponent;    
  }
}
</script>

<style lang="scss" scoped>
.workspace-window {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
