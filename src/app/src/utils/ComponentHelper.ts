import { Component } from '@/models/Network/Component';

export function FindChild(component: Component, id: string): Component | undefined {
    if (component.Id = id)
        return component;

    var target = component.SubComponents.find(elm => elm.Id == id);
    if (target)
        return target;

    component.SubComponents.forEach(elm => {
        target = FindChild(elm, id);
        if (target)
            return target;
    });
    return undefined;
}

