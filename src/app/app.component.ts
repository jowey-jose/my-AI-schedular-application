import { Component, ViewEncapsulation } from '@angular/core';
import { View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule'
import { DataManager, WebApiAdaptor} from '@syncfusion/ej2-data' //import enables using tasks from a remote data source, which is the ej2 data repository.  

@Component({
  selector: 'app-root',
  template: '<ejs-schedule height="850" width="1250" [eventSettings]="eventObject" [selectedDate]="setDate" [currentView]="setView"></ejs-schedule>',
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-AI-schedular-app';
  public setView: View = 'Month'
  public setDate: Date = new Date(2017, 5, 5);
  private eventData: DataManager = new DataManager({
    url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData', // uses the already available data, through POST, and binds it to the the angular schedular.
    adaptor: new WebApiAdaptor,
    crossDomain: true

  });
  public eventObject: EventSettingsModel = {
    dataSource: this.eventData //uses the data provided by the data manager. Retrived from the remote data Source.
    // dataSource: [{

      // EventTitle: "", 
      // EventStart: new Date(2019,0,17,4,0),
      // EventEnd: new Date(2019,0,17,6,0),
      // IsBlock: true //particular cell is blocked for crud operations
      // IsReadonly: true //the particular task is read only.
      // RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10" //set intervals of recurrence of the same day for 10 days.
      // IsAllDay: true
    // }],
    // fields:{
    //   subject: {name :"EventTitle", default : "Hello, No Task", title: "Enter Title"},
    //   startTime: {name: "EventStart"},
    //   endTime:{name: "EventEnd"}
    // }
  }

  }

