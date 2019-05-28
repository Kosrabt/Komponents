<template>
  <div class="workspace-window">
    <network
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @click="onClick"
      @double-click="networkEvent('doubleClick')"
      @oncontext="networkEvent('oncontext')"
      @hold="networkEvent('hold')"
      @release="networkEvent('release')"
      @select="networkEvent('select')"
      @select-node="onSelectionChanged"
      @select-edge="networkEvent('selectEdge')"
      @deselect-node="onSelectionChanged"
      @deselect-edge="networkEvent('deselectEdge')"
      @drag-start="networkEvent('dragStart')"
      @dragging="networkEvent('dragging')"
      @drag-end="onDragEnd"
      @hover-node="networkEvent('hoverNode')"
      @blur-node="networkEvent('blurNode')"
      @hover-edge="networkEvent('hoverEdge')"
      @blur-edge="networkEvent('blurEdge')"
      @zoom="networkEvent('zoom')"
      @show-popup="networkEvent('showPopup')"
      @hide-popup="networkEvent('hidePopup')"
      @start-stabilizing="networkEvent('startStabilizing')"
      @stabilization-progress="networkEvent('stabilizationProgress')"
      @stabilization-iterations-done="networkEvent('stabilizationIterationsDone')"
      @stabilized="networkEvent('stabilized')"
      @resize="networkEvent('resize')"
      @init-redraw="networkEvent('initRedraw')"
      @before-drawing="networkEvent('beforeDrawing')"
      @after-drawing="networkEvent('afterDrawing')"
      @animation-finished="networkEvent('animationFinished')"
      @config-change="networkEvent('configChange')"
      @nodes-mounted="networkEvent('nodes-mounted')"
      @nodes-add="networkEvent('nodes-add')"
      @nodes-update="networkEvent('nodes-update')"
      @nodes-remove="networkEvent('nodes-remove')"
      @edges-mounted="networkEvent('edges-mounted')"
      @edges-add="networkEvent('edges-add')"
      @edges-update="networkEvent('edges-update')"
      @edges-remove="networkEvent('edges-remove')"
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
  methods: {
    networkEvent(eventName) {},
    onDragEnd(event) {
      const nodes = event.nodes;
      const positions = this.$refs.network.getPositions(nodes);
      for (let [key, value] of Object.entries(positions)) {
        let component = this.findComponentById(key);
        if (component) {
          component.Position.X = value.x;
          component.Position.Y = value.y;
          this.notifyChange(component);
        }
      }
    },
    onSelectionChanged(event) {
      let component = undefined;
      if (event.nodes.length > 0) {
        var nodeId = event.nodes[0];
        component = this.findComponentById(nodeId);
      }
      this.notifyNodeSelected(component);
    },
    onClick(event) {
      const point = event.pointer.canvas;
      this.$emit("click", point);
    },
    findComponentById(nodeId) {
      return this.currentComponent.SubComponents.find(
        element => element.Id === nodeId
      );
    },
    notifyChange(component) {
      this.$emit("componentChanged", component);
    },
    notifyNodeSelected(component) {
      this.$emit("componentSelected", component);
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
            to: link.To.Id
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
