import { Component } from '@/models/Network/Component';

export function FindChild(component: Component, id: string): Component | undefined {

    if (component.Id === id)
        return component;

    var child = component.SubComponents.find(elm => FindChild(elm, id) !== undefined);

    if (!!child) return child;

    return undefined;
}

