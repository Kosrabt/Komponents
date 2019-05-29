import { VuexModule, mutation, action, getter, Module } from "vuex-class-component";
import  vue  from 'vue';
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
    Link: Link
}


export function FindComponent(rootComponent: Component, componentId: string): Component | undefined {
    if (rootComponent.Id === componentId)
        return rootComponent;

    return rootComponent.SubComponents.find(elm => FindComponent(elm, componentId) !== undefined);
}


@Module({ namespacedPath: "network/" })
export class NetworkStore extends VuexModule {

    private component: Component;
    private selectedComponentId: string;

    constructor() {
        super();
        this.component = new DataLoader().LoadDummyData();
        this.selectedComponentId = this.component.Id;
    }

    get SelectedComponent(): Component | undefined {
        return FindComponent(this.component, this.selectedComponentId);
    }

    @mutation LoadComponent(newRootComponent: Component) {
        this.component = newRootComponent;
        this.selectedComponentId = this.component.Id;
    }

    @mutation SelectComponent(selectedComponentId: string) {
        if (FindComponent(this.component, selectedComponentId)) {
            this.selectedComponentId = selectedComponentId;
        }
    }

    @mutation ComponentPositionChanged({ ComponentId, Position }: ComponentPositionChangedRequest) {
        let component = FindComponent(this.component, ComponentId);
        if (!!component) {
            component.Position = Position;
        }
    }

    @mutation AddNewComponent(newComponent: Component) {
        let selectedComponent = FindComponent(this.component, this.selectedComponentId);
        if (!!selectedComponent) {            
            selectedComponent.SubComponents.push(newComponent);
        }
    }

    @mutation AddNewLink({ ComponentId, Link }: AddNewLinkRequest) {
        let selectedComponent = FindComponent(this.component, ComponentId);
        if (!!selectedComponent) {           
            selectedComponent.Links.push(Link);
        }
    }
}