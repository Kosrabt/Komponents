import { Component } from '@/models/Network/Component';

export function FindChild(component: Component, id: string): Component | undefined {
    if (component.Id === id)
        return component;

    var child = component.SubComponents.find(elm => elm.Id === id);
    if (child)
        return child;

    component.SubComponents.forEach(elm => {
        let allsub = FindChild(elm, id);
        if (allsub)
            return allsub;
    });
    return undefined;
}

