import { VuexModule, mutation, action, getter, Module } from "vuex-class-component";
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

@Module({ namespacedPath: "network/" })
export class NetworkStore extends VuexModule {

    private component?: Component;
    private selectedComponentId? : string;

    constructor() {
        super();
        this.component = new DataLoader().LoadDummyData();
    }

    get SelectedComponent(): Component | undefined {
        return this.FindComponent(this.selectedComponentId);
    }

    @mutation LoadComponent(newRootComponent: Component) {
        this.component = newRootComponent;
        this.selectedComponentId = this.component.Id;
    }

    @mutation SelectComponent(selectedComponentId: string) {
        if (this.FindComponent(selectedComponentId)) {
            this.selectedComponentId = selectedComponentId;
        }
    }

    @mutation ComponentPositionChanged({ ComponentId, Position }: ComponentPositionChangedRequest) {
        let component = this.FindComponent(ComponentId);
        if (!!component) {
            component.Position = Position;
        }
    }

    @mutation AddNewComponent(newComponent: Component) {
        let selectedComponent = this.SelectedComponent;
        if (!!selectedComponent) {
            selectedComponent.SubComponents.push(newComponent);
        }
    }

    @mutation AddNewLink({ ComponentId, Link }: AddNewLinkRequest) {
        let component = this.FindComponent(ComponentId);
        if (!!component) {
            component.Links.push(Link);
        }
    }

    private FindComponent(componentId: string | undefined): Component | undefined {
        if (!componentId)
            return undefined;

        if (this.component) {
            return this.FindComponentReq(this.component, componentId);
        }
        return undefined;
    }

    private FindComponentReq(rootComponent: Component, componentId: string): Component | undefined {
        if (rootComponent.Id === componentId)
            return rootComponent;

        return rootComponent.SubComponents.find(elm => this.FindComponentReq(elm, componentId) !== undefined);
    }
}