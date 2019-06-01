<template>
  <div class="Component-view">
    <Sidebar>
      <SidebarButton  v-for="component in AllParent" :key="component.Id" @click="onSelectComponent(component.Id)">{{component.Name}}</SidebarButton>     
    </Sidebar>
    <div class="workspace-wrapper">
      <div class="workspace">
        <Workspace
          ref="workspace"
          :currentComponent="CalculatedComponent"
          @componentChanged="onComponentChanged"
          @componentSelected="onComponentSelected"
          @click="onClick"
          @doubleClick="onDoubleClick"
        ></Workspace>
      </div>
      <div class="messages">{{debugMessages}}</div>
      <div class="button back" v-if="IsNotRootComponent" @click="onBackButtonClicked">
        <i class="material-icons">arrow_back</i>
      </div>
    </div>

    <fab
      :position="fabConfig.position"
      :bg-color="fabConfig.bgColor"
      :actions="fabConfig.fabActions"
      @addComponent="addNewComponent"
    ></fab>
  </div>
</template>

<script lang="ts">
import { Component as VueComponent, Prop, Vue } from "vue-property-decorator";

import fab from "vue-fab";
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

@VueComponent({
  components: {
    Workspace,
    SidebarButton,
    Sidebar,
    fab
  }
})
export default class ComponentView extends Vue {
  action: string = Actions.Move;
  selection: any = {
    selectedComponent: undefined
  };

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

  get AllParent(): Component[]
  {
    return vxm.network.AllParentToSelected;
  }

  get IsNotRootComponent(): boolean {
    if (!vxm.network.CalculatedComponent) return false;

    return vxm.network.CalculatedComponent.Id != vxm.network.Component.Id;
  }

  protected onComponentChanged(component: Component) {
    vxm.network.ComponentPositionChanged({
      ComponentId: component.Id,
      Position: component.Position
    });
  }

  protected onComponentSelected(Component: Component) {
    if (!Component) {
      this.UnselectAll();
      return;
    }
    var newComponent = this.GetComponentById(Component.Id);
    this.HandleSelectActions(newComponent);
    this.selection.selectedComponent = newComponent;
  }

  protected onClick(position: any) {
    this.HandleAddNewComponent(position);
  }

  protected onDoubleClick(componentId: string) {
    vxm.network.SelectComponent(componentId);
  }

  protected onKeyPressed(event: any): void {
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

      default:
        break;
    }
  }

  protected onBackButtonClicked() {
    this.StepBackToParentComponent();
  }

  protected onSelectComponent(componentId : string)
  {
    vxm.network.SelectComponent(componentId);
  }

  protected StepBackToParentComponent() {
    if (this.IsNotRootComponent) {
      vxm.network.SelectParentComponent();
    }
  }

  protected ResetAction() {
    this.action = Actions.Move;
    this.UnselectAll();
  }

  protected UnselectAll() {
    this.selection.selectedComponent = undefined;
    this.$refs.workspace.unselectAll();
  }

  protected get debugMessages(): string {
    var message = "CurrentAction: " + this.action;
    if (this.selection.selectedComponent) {
      message +=
        " Selected component: " + this.selection.selectedComponent.Name;
    }
    return message;
  }

  //Operations
  protected addNewComponent(): void {
    this.action = Actions.AddNode;
  }

  protected HandleSelectActions(Component: Component | undefined): void {
    if (
      this.action === Actions.AddEdge &&
      this.selection.selectedComponent &&
      Component
    ) {
      this.AddLink(this.selection.selectedComponent, Component);
      this.ResetAction();
    }
  }

  protected AddLink(from: Component, to: Component) {
    var id = from.Id + "-" + to.Id;
    var newLink = new Link(id, "Link_" + id, to.Id);
    vxm.network.AddNewLink({ ComponentId: from.Id, NewLink: newLink });
  }

  private HandleAddNewComponent(position: any) {
    if (position && this.action == Actions.AddNode) {
      var newComponent = this.GetRandomComponent();
      if (!!newComponent) {
        newComponent.Position = new Point(position.x, position.y);
        vxm.network.AddNewComponent(newComponent);
        this.ResetAction();
      }
    }
  }

  private GetComponentById(id: string): Component | undefined {
    if (!vxm.network.CalculatedComponent) return undefined;

    return vxm.network.CalculatedComponent.SubComponents.find(c => c.Id == id);
  }

  get fabConfig(): any {
    return {
      position: "absolute",
      bgColor: "#45A29E",
      fabActions: [
        {
          name: "addComponent",
          icon: "plus_one",
          tooltip: "Add new Component"
        }
      ]
    };
  }

  private GetRandomComponent(): Component | undefined {
    if (!vxm.network.CalculatedComponent) return undefined;

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
