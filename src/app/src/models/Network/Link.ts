import { Component } from "./Component";

export class Link {

    public Id: string;
    public Name : string;
    
    public To: Component;    

    constructor (id: string, name: string, to:Component)
    {
        this.Id = id;
        this.Name = name;
        this.To = to;
    }
}