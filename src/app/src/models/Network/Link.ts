export class Link {

    public Id: string;
    public Name : string;
    
    public To: string;    

    constructor (id: string, name: string, to:string)
    {
        this.Id = id;
        this.Name = name;
        this.To = to;
    }
}