<template>
  <div class="Component-view">
    <Sidebar>
      <SidebarButton
        v-for="component in AllParent"
        :key="component.Id"
        @click="onSelectComponent(component.Id)"
      >{{component.Name}}</SidebarButton>
    </Sidebar>
    <div class="workspace-wrapper">
      <div class="workspace">
        <Workspace
          ref="workspace"
          :currentComponent="CalculatedComponent"
          @click="onClick"
          @doubleClick="onDoubleClick"
          @nodepositionchanged="onNodePositionChanged"
        ></Workspace>
      </div>
      <div class="messages">{{debugMessages}}</div>
      <div class="button back" v-if="IsNotRootComponent" @click="onBackButtonClicked">
        <i class="material-icons">arrow_back</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component as VueComponent, Prop, Vue } from "vue-property-decorator";

import Workspace from "../components/Network/Workspace.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import SidebarButton from "@/components/Sidebar/SidebarButton.vue";
import { Component } from "@/models/Network/Component";
import { Link } from "@/models/Network/Link";
import { Point } from "@/models/Network/Point";
import { ComponentOptions } from "vue";
import { vxm } from "@/store";

const Actions: any = {
  Move: "Move",
  AddEdge: "Add Edge",
  AddNode: "Add Node"
};

interface nodepositionchangedRequest {
  id: string;
  x: number;
  y: number;
}

interface clickRequest {
  position: Point;
  nodes: string[];
  edges: string[];
}

@VueComponent({
  components: {
    Workspace,
    SidebarButton,
    Sidebar
  }
})
export default class ComponentView extends Vue {
  private action: string = Actions.Move;
  private selectedComponents: string[] = [];
  private selectedEdges: string[] = [];

  private idIndex: number = 0;
  constructor() {
    super();
  }

  protected created() {
    window.addEventListener("keyup", this.onKeyPressed);
  }

  get CalculatedComponent(): Component | undefined {
    return vxm.network.CalculatedComponent;
  }

  get AllParent(): Component[] {
    return vxm.network.AllParentToSelected;
  }

  get IsNotRootComponent(): boolean {
    if (!vxm.network.CalculatedComponent) return false;

    return vxm.network.CalculatedComponent.Id != vxm.network.Component.Id;
  }

  //Events
  private onClick(event: clickRequest) {
    if (!event) return;

    switch (this.action) {
      case Actions.AddNode:
        this.AddComponent(new Point(event.position.X, event.position.Y));
        this.ResetAction();
        break;

      case Actions.AddEdge:
        if (event.nodes.length > 0 && this.selectedComponents.length > 0) {
          this.AddLink(this.selectedComponents[0], event.nodes[0]);
          this.ResetAction();
          this.UnselectAll();
          break;
        }

      default:
        this.selectedComponents = event.nodes;
        this.selectedEdges = event.edges;
        break;
    }
  }

  private onDoubleClick(componentId: string) {
    vxm.network.SelectComponent(componentId);
    this.UnselectAll();
  }

  private onNodePositionChanged(request: nodepositionchangedRequest) {
    let component = this.GetComponentById(request.id);
    if (component) {
      vxm.network.ComponentPositionChanged({
        ComponentId: component.Id,
        Position: new Point(request.x, request.y)
      });
    }
  }

  private onKeyPressed(event: any): void {
    var keyCode = event.code;
    switch (keyCode) {
      case "Escape":
        this.ResetAction();
        break;

      case "KeyE":
        this.action = Actions.AddEdge;
        break;

      case "KeyN":
        this.action = Actions.AddNode;
        break;

      case "Backspace":
        this.StepBackToParentComponent();
        break;

      case "Delete":
        this.DeleteSelected();
        break;

      default:
        break;
    }
  }

  protected onBackButtonClicked() {
    this.StepBackToParentComponent();
  }

  //Methods

  private StepBackToParentComponent() {
    if (this.IsNotRootComponent) {
      vxm.network.SelectParentComponent();
    }
  }

  private ResetAction() {
    this.action = Actions.Move;
    this.UnselectAll();
  }

  private UnselectAll() {
    this.selectedComponents = [];
    this.selectedEdges = [];
    this.$bus.$emit("unselectcomponents");
  }

  private get debugMessages(): string {
    var message = "CurrentAction: " + this.action;
    if (this.selectedComponents.length > 0) {
      message += " Selected component: " + this.selectedComponents;
    }
    if (this.selectedEdges.length > 0) {
      message += " Selected edges: " + this.selectedEdges;
    }
    return message;
  }

  private AddComponent({ X, Y }: Point) {
    var component = this.GetRandomComponent().Move(X, Y);
    vxm.network.AddNewComponent(component);
  }

  private AddLink(fromId: string, toId: string) {
    var id = fromId + "-" + toId;
    var newLink = new Link(id, "Link_" + id, toId);
    vxm.network.AddNewLink({ ComponentId: fromId, NewLink: newLink });
  }

  private DeleteSelected() 
  {
    vxm.network.DeleteComponent(this.selectedComponents[0]);
  }

  private GetComponentById(id: string): Component | undefined {
    if (!vxm.network.CalculatedComponent) return undefined;

    return vxm.network.CalculatedComponent.SubComponents.find(c => c.Id == id);
  }

  private GetRandomComponent(): Component {
    if (!vxm.network.CalculatedComponent) throw "No workspace selected";

    var newId = (this.idIndex++).toString();
    return new Component(
      newId,
      vxm.network.CalculatedComponent.Id,
      "Name" + newId
    );
  }
}
</script>

<style lang="scss" scoped>
.Component-view {
  display: flex;
  flex: 1;
  position: relative;

  .workspace-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .workspace {
    width: 100%;
    height: 100%;
  }

  .button {
    position: absolute;
    cursor: pointer;
    padding: 10px;

    &.back {
      left: 22px;
      top: 22px;
    }
  }

  .action-button {
    line-height: 64px;
    width: 64px;
    right: 32px;
    height: 64px;
    text-align: center;
    position: absolute;
    cursor: pointer;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    font-size: 24px;
    border-radius: 50%;
    bottom: 16px;
    background: #09edc8;
    color: white;
  }
  .messages {
    position: absolute;
    bottom: 40px !important;
    left: 40px !important;
    z-index: 5;
  }
}
</style>
