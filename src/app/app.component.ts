import { Component, ViewEncapsulation } from '@angular/core';
// import {view} from '@syncfusion-ej2-schedule';
@Component({
  selector: 'app-root',
  template: '<ejs-schedule height="850" width="1250"></ejs-schedule>',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  title = 'my-AI-schedular-app';
}
