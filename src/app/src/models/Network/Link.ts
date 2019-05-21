import { Komponent } from "./Komponent";

export class Link {

    public Id: string;
    public Name : string;
    
    public To: Komponent;    

    constructor (id: string, name: string, to:Komponent)
    {
        this.Id = id;
        this.Name = name;
        this.To = to;
    }
}