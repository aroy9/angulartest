import { Component } from '@angular/core';

@Component({
  selector: 'freshapp',  
  templateUrl: './app.component.html',
  //styles: [`p{color:red;}`]
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public jack = "Abhijit"
  title = 'Test';
  public siteUrl = window.location.href;
  public isdisabled = true;

  showuser(){
    return "Hello " + "" + this.jack;
  }

public issuccess = "success";
public isdepend = false;

public totaltext = {
  "success" : this.isdepend  
}


}
