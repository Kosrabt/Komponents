<template>
  <div class="komponent-view">
    <Sidebar>
      <SidebarButton @click="SelectFirst" >Component 1</SidebarButton>
      <SidebarButton @click="SelectSecond">Component 2</SidebarButton>
    </Sidebar>
    <div class="workspace">
      <Workspace 
      :currentKomponent="currentKomponent"
      @componentChanged="onComponentChanged"
      ></Workspace>
    </div>
    <div class="action-button add-button" @click="addNewComponent">+</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Workspace from "../components/Network/Workspace.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import SidebarButton from "@/components/Sidebar/SidebarButton.vue";
import { Komponent } from "@/models/Network/Komponent";
import { Link } from "@/models/Network/Link";
import { Point } from "@/models/Network/Point";

@Component({
  components: {
    Workspace,
    SidebarButton,
    Sidebar
  }
})
export default class KomponentView extends Vue {
  
  
  currentKomponent: Komponent;

  private idIndex: number =0;
  constructor()
  {
    super();
    this.currentKomponent = this.GetBaseData();
  }

  protected onComponentChanged(komponent: Komponent)
  {
    let targetKomponent = this.GetKomponentById(komponent.Id);
    if (targetKomponent)
      {
        targetKomponent.OverrideMeta(komponent);
      }
  }

  protected addNewComponent()
  {
    var newKomponent =this.GetRandomKomponent();
    this.currentKomponent.SubKomponents.push(newKomponent);
  }

  private GetKomponentById(id: string): Komponent | undefined
  {
    return this.currentKomponent.SubKomponents.find(c => c.Id == id);
  }
  
  //For testing
  protected SelectFirst(): void
  {
    this.currentKomponent = this.GetBaseData();
  }

  protected SelectSecond(): void
  {
    this.currentKomponent = this.GetBaseData2();
  }

  private GetRandomKomponent():Komponent
  {
    var newId = (this.idIndex++).toString();
    return new Komponent(newId, this.currentKomponent.Id, "Name"+newId);
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

  .workspace {
    width: 100%;
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
  .add-button {
      background: #00a2ff !important;
      bottom: 40px !important;
      right: 40px !important;
      transition: transform 500ms ease;
      z-index: 5;
    }
}
</style>
