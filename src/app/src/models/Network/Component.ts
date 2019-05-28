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
}