import { Point } from "./Point";
import { Link } from "./Link";

export class Komponent {
    
    public Id: string;
    public ParentId: string;
    public Name : string;

    public SubKomponents : Komponent[] = [];
    public Links : Link[] = [];
    
    public Position: Point = new Point(0,0);

    constructor (id: string, parentId: string, name : string)
    {
        this.Id = id;
        this.ParentId = parentId;
        this.Name = name;
    }

    public OverrideMeta(source:Komponent): void
    {
        this.Name = source.Name;
        this.Position = source.Position;
    }
}