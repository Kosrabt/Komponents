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
    var root = new Component("root", "", "root");

    var customer = new Component("TCM", "root", "Techsson.Customer").Move(-100,0);
    root.AddChild(customer);

    var jrc = new Component("JRC", "root", "Techsson.Jrc").Move(100,0);
    root.AddChild(jrc);

    var GovernmentMustAllowLink = new Link("TCM-JRC-Use", "GovernmentMustAllow", "JRC");
    customer.Links.push(GovernmentMustAllowLink);
  
    var Jrc_Compliance_Api = new Component("JRC_Compliance", "JRC", "Techsson.Jrc.Compliance").Move(-100,0);
    var Jrc_UnitedKingdom_Api = new Component("JRC_UKGC", "JRC", "Techsson.Jrc.UnitedKingdom").Move(100, -100);
    var Jrc_Sweden_Api = new Component("JRC_SGA", "JRC", "Techsson.Jrc.Sweden").Move(100, 0);
    var Jrc_Denmark_Api = new Component("JRC_DGA", "JRC", "Techsson.Jrc.Denmark").Move(100, 100);

    Jrc_Compliance_Api.AddLink(new Link("JRC_Compliance_JRC_UKGC_Check", "Check",Jrc_UnitedKingdom_Api.Id));
    Jrc_Compliance_Api.AddLink(new Link("JRC_Compliance_JRC_SGA_Check", "Check",Jrc_Sweden_Api.Id));
    Jrc_Compliance_Api.AddLink(new Link("JRC_Compliance_JRC_DGA_Check", "Check",Jrc_Denmark_Api.Id));

    jrc.AddChild(Jrc_Compliance_Api);
    jrc.AddChild(Jrc_UnitedKingdom_Api);
    jrc.AddChild(Jrc_Sweden_Api);
    jrc.AddChild(Jrc_Denmark_Api);
    
    return root;
  }
}