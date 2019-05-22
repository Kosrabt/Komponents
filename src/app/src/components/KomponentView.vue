<template>
  <div class="komponent-view">
    <Sidebar>
      <SidebarButton @click="SelectFirst">Component 1</SidebarButton>
      <SidebarButton @click="SelectSecond">Component 2</SidebarButton>
    </Sidebar>
    <div class="workspace-wrapper">
      <div class="messages">{{debugMessages}}</div>
      <div class="workspace">
        <Workspace
          ref="workspace"
          :currentKomponent="currentKomponent"
          @componentChanged="onComponentChanged"
          @componentSelected="onComponentSelected"
          @click="onClick"
        ></Workspace>
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
import { Component, Prop, Vue } from "vue-property-decorator";

import fab from "vue-fab";
import Workspace from "../components/Network/Workspace.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import SidebarButton from "@/components/Sidebar/SidebarButton.vue";
import { Komponent } from "@/models/Network/Komponent";
import { Link } from "@/models/Network/Link";
import { Point } from "@/models/Network/Point";

const Actions: any = {
  Move: "Move",
  AddEdge: "Add Edge",
  AddNode: "Add Node"
};

@Component({
  components: {
    Workspace,
    SidebarButton,
    Sidebar,
    fab
  }
})
export default class KomponentView extends Vue {
  currentKomponent: Komponent;
  action: string = Actions.Move;
  selection: any = {
    selectedComponent: undefined
  };

  private idIndex: number = 0;
  constructor() {
    super();
    this.currentKomponent = this.GetBaseData();
  }

  protected created() {
    window.addEventListener("keyup", this.onKeyPressed);
  }

  protected onComponentChanged(komponent: Komponent) {
    let targetKomponent = this.GetKomponentById(komponent.Id);
    if (targetKomponent) {
      targetKomponent.OverrideMeta(komponent);
    }
  }

  protected onComponentSelected(komponent: Komponent) {
    if (!komponent) this.UnselectAll();

    var newKomponent = this.GetKomponentById(komponent.Id);
    this.handleSelectActions(newKomponent);
    this.selection.selectedComponent = newKomponent;
  }

  protected onClick(position: any) {
    if (position && this.action == Actions.AddNode) {
      var newKomponent = this.GetRandomKomponent();
      newKomponent.Position = new Point(position.x, position.y);
      this.currentKomponent.SubKomponents.push(newKomponent);
      this.ResetAction();
    }
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

      default:
        break;
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

  protected handleSelectActions(komponent: Komponent | undefined): void {
    if (
      this.action === Actions.AddEdge &&
      this.selection.selectedComponent &&
      komponent
    ) {
      this.AddLink(this.selection.selectedComponent, komponent);
      this.ResetAction();
    }
  }

  protected AddLink(from: Komponent, to: Komponent) {
    var id = from.Id + "-" + to.Id;
    var newLink = new Link(id, "Link_" + id, to);
    from.Links.push(newLink);
  }

  private GetKomponentById(id: string): Komponent | undefined {
    return this.currentKomponent.SubKomponents.find(c => c.Id == id);
  }

  get fabConfig(): any {
    return {
      position: "absolute",
      bgColor: "#45A29E",
      fabActions: [
        {
          name: "addComponent",
          icon: "plus_one",
          tooltip: "Add new Komponent"
        },
        {
          name: "addOther",
          icon: "add_alert"
        }
      ]
    };
  }

  //For testing
  protected SelectFirst(): void {
    this.currentKomponent = this.GetBaseData();
  }

  protected SelectSecond(): void {
    this.currentKomponent = this.GetBaseData2();
  }

  private GetRandomKomponent(): Komponent {
    var newId = (this.idIndex++).toString();
    return new Komponent(newId, this.currentKomponent.Id, "Name" + newId);
  }

  private GetBaseData(): Komponent {
    var k1 = new Komponent("k1", "root", "Name1");
    var k2 = new Komponent("k2", "root", "Name2");
    var link = new Link("k1-k2", "Link", k2);
    k1.Links.push(link);

    k1.Position = new Point(100, 0);
    k2.Position = new Point(-100, 0);

    var komponent = new Komponent("root", "", "Root");
    komponent.Position = new Point(0, 0);
    komponent.SubKomponents.push(k1, k2);
    return komponent;
  }

  private GetBaseData2(): Komponent {
    var k1 = new Komponent("k1", "root", "Name3");
    var k2 = new Komponent("k2", "root", "Name4");
    var link = new Link("k1-k2", "Link", k2);
    k1.Links.push(link);

    k1.Position = new Point(100, 0);
    k2.Position = new Point(-100, 0);

    var komponent = new Komponent("root", "", "Root");
    komponent.Position = new Point(0, 0);
    komponent.SubKomponents.push(k1, k2);
    return komponent;
  }
}
</script>

<style lang="scss" scoped>
.komponent-view {
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
