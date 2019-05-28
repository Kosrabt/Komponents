import { Component } from './models/Network/Component';
import { Link } from './models/Network/Link';
import { Point } from './models/Network/Point';

export class DataLoader
{
    LoadDummyData(): Component    
    {
        return this.GetBaseData();
    }

    
  private GetBaseData(): Component {
    var k1 = new Component("k1", "root", "Name1");
    var k2 = new Component("k2", "root", "Name2");
    var link = new Link("k1-k2", "Link", k2);
    k1.Links.push(link);

    k1.Position = new Point(100, 0);
    k2.Position = new Point(-100, 0);

    var newComponent = new Component("root", "", "Root");
    newComponent.Position = new Point(0, 0);
    newComponent.SubComponents.push(k1, k2);
    return newComponent;
  }
}