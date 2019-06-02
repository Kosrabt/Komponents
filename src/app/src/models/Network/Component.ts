import { Point } from "./Point";
import { Link } from "./Link";

export class Component {

    public Id: string;
    public ParentId: string;
    public Name: string;

    public SubComponents: Component[] = [];
    public Links: Link[] = [];

    public Position: Point = new Point(0, 0);

    constructor(id: string, parentId: string, name: string) {
        this.Id = id;
        this.ParentId = parentId;
        this.Name = name;
    }

    public AddChild(child: Component): void {
        this.SubComponents.push(child);
    }

    public Move(x: number, y: number): Component
    {
        this.Position = new Point(x, y);
        return this;
    }

    public AddLink(link: Link): void
    {
        this.Links.push(link);
    }
}