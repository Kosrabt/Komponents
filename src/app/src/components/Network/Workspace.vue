<template>
  <div class="workspace-window">
    <network
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @click="onClick"
      @double-click="onDoubleClick"
      @drag-end="onDragEnd"
      @zoom="networkEvent('zoom')"
      @stabilized="networkEvent('stabilized')"
    ></network>
  </div>
</template>

<script>
import { Network } from "vue2vis";

export default {
  name: "Workspace",
  components: {
    Network
  },
  props: {
    currentComponent: {}
  },
  computed: {
    network() {
      return this.computeNetwork();
    }
  },
  mounted() {
    var currentComponent = this;
    this.$bus.$on("unselectcomponents", params => {
      currentComponent.unselectAll();
    });
  },
  methods: {
    networkEvent(eventName) {},

    onDragEnd(event) {
      const nodes = event.nodes;
      const positions = this.$refs.network.getPositions(nodes);
      for (let [key, value] of Object.entries(positions)) {
        this.$emit("nodepositionchanged", { id: key, x: value.x, y: value.y });
      }
    },
    
    onDoubleClick(event) {
      if (event && event.nodes && event.nodes.length > 0) {
        this.$emit("doubleClick", event.nodes[0]);
      }
    },

    onClick(event) {    
      const point = event.pointer.canvas;
      this.$emit("click",
      {
        position: {X:event.pointer.canvas.x, Y:event.pointer.canvas.y},
        nodes: event.nodes,
        edges: event.edges
      });
    },

    unselectAll() {
      this.$refs.network.unselectAll();
    },

    computeNetwork() {
      var nodes = [];
      var edges = [];
     
      this.currentComponent.SubComponents.forEach(component => {
        var node = {
          id: component.Id,
          label: component.Name,
          x: component.Position.X,
          y: component.Position.Y
        };
        nodes.push(node);
        component.Links.forEach(link => {
          var edge = {
            id: link.Id,
            name: link.Name,
            from: component.Id,
            to: link.To
          };
          edges.push(edge);
        });
      });
      return { nodes: nodes, edges: edges, options: this.getOptions() };
    },

    getOptions() {
      return {
        edges: {
          smooth: false,
          arrows: {
            to: {
              enabled: true
            }
          },
          color: {
            color: "#AAA",
            highlight: "#A22"
          }
        },
        physics: {
          enabled: false
        },
        nodes: {
          shape: "dot",
          size: 10,
          color: {
            border: "#333",
            background: "#999",
            highlight: {},
            hover: {}
          },
          font: {
            color: "#DDD",
            strokeWidth: 6,
            strokeColor: "#222"
          }
        }
      };
    }
  }
};
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
