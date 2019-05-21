<template>
  <div class="workspace-window">
    <network
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
    ></network>Other
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Komponent } from "@/models/Network/Komponent";
import { Network } from "vue2vis";
import { Link } from "models/Network/Link";
import { Point } from '@/models/Network/Point';

@Component({
  components: {
    Network
  }
})
export default class NetworkPlane extends Vue {
  @Prop({ required : true})
  komponent: Komponent;

  protected data() {
    return {};
  }

  get network() {
    var nodes: any[] = [];
    var edges: any[] = [];
    
    this.komponent.SubKomponents.forEach((component: Komponent) => {
      var node = {
        id: component.Id,
        label: component.Name,
        x: component.Position.X,
        y: component.Position.Y  
      };
      nodes.push(node);
      component.Links.forEach((link: Link) => {
        var edge =
        {
          id: link.Id,
          name: link.Name,
          from: component.Id,
          to: link.To
        }
        edges.push(edge);
      });
    });

    return { nodes: nodes, edges: edges, options: this.options };
  }

  get options()
  {
    return {
      edges:
      {
        smooth: false,
        strokeWidth:1, 
        strokeColor:'#A0A0A0'           
      },
      physics:
      {
        enabled: false,
      },
      nodes:{
        shape: "dot",
        size: 10,
        color: "#999",
        boderColor: "#AAA",
        font: {
          color: "#DDD",
          strokeWidth: 6,
          strokeColor: "#222"
        }    
      }
    }    
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
.network {
  height: 100%;
  width: 100%;
}
</style>
