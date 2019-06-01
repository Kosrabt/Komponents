import { VuexModule, mutation, action, getter, Module } from "vuex-class-component";
import vue from 'vue';
import { Component } from './models/Network/Component';
import { _state } from 'vuex-class-component/dist/symbols';
import { Point } from './models/Network/Point';
import { Link } from './models/Network/Link';
import { DataLoader } from './DataLoader';

interface ComponentPositionChangedRequest {
    ComponentId: string,
    Position: Point
}

interface AddNewLinkRequest {
    ComponentId: string,
    NewLink: Link
}


export function FindComponent(component: Component, lookupId: string): Component | undefined {
    if (component.Id === lookupId)
        return component;

    return component.SubComponents.map(elm => FindComponent(elm, lookupId)).find(elm => elm != undefined);
}

export function FindAllParent(rootComponent: Component, targetComponentId: string): Component[]
{
    if (rootComponent.Id == targetComponentId)
    return [rootComponent];

    var targetComponent = FindComponent(rootComponent, targetComponentId);
    if (!!targetComponent)
    {
        var allParentComponents = FindAllParent(rootComponent, targetComponent.ParentId);
        return [...allParentComponents, targetComponent];
    }

    return [];
}

@Module({ namespacedPath: "network/" })
export class NetworkStore extends VuexModule {

    public Component: Component;
    private selectedComponentId: string;

    constructor() {
        super();
        this.Component = new DataLoader().LoadDummyData();
        this.selectedComponentId = this.Component.Id;
    }

    get CalculatedComponent(): Component | undefined {
        return FindComponent(this.Component, this.selectedComponentId);
    }

    get AllParentToSelected(): Component[]
    {
        if (!this.selectedComponentId)
        {
            return [];
        }
        return FindAllParent(this.Component, this.selectedComponentId);
    }

    @mutation LoadComponent(newRootComponent: Component) {
        this.Component = newRootComponent;
        this.selectedComponentId = this.Component.Id;
    }

    @mutation SelectComponent(selectedComponentId: string) {
        if (FindComponent(this.Component, selectedComponentId)) {
            this.selectedComponentId = selectedComponentId;
        }
    }

    @mutation ComponentPositionChanged({ ComponentId, Position }: ComponentPositionChangedRequest) {
        let component = FindComponent(this.Component, ComponentId);
        if (!!component) {
            component.Position = Position;
        }
    }

    @mutation AddNewComponent(newComponent: Component) {
        let selectedComponent = FindComponent(this.Component, this.selectedComponentId);
        if (!!selectedComponent) {
            selectedComponent.SubComponents.push(newComponent);
        }
    }

    @mutation AddNewLink({ ComponentId, NewLink }: AddNewLinkRequest) {
        let selectedComponent = FindComponent(this.Component, ComponentId);
        if (!!selectedComponent) {
            selectedComponent.Links.push(NewLink);
        }
    }

    @action async SelectParentComponent() {
        if (!!this.CalculatedComponent) {
            this.SelectComponent(this.CalculatedComponent.ParentId);
        }
    }
}