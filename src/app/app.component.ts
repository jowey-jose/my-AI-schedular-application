import { Component, ViewEncapsulation, ViewChild} from '@angular/core';
import { View, EventSettingsModel, DragEventArgs, ResizeEventArgs, ScheduleComponent, CellClickEventArgs} from '@syncfusion/ej2-angular-schedule'
// import { DataManager, WebApiAdaptor} from '@syncfusion/ej2-data' //import enables using tasks from a remote data source, which is the ej2 data repository.  
import { DragAndDropEventArgs} from '@syncfusion/ej2-angular-navigations'

@Component({
  selector: 'app-root',
  template: 
  '<div> <div style = "float:left"> <ejs-schedule #scheduleObj height="740" width="1150" [eventSettings]="eventObject" [selectedDate]="setDate" [currentView]="setView" (dragStart) = "onDragStart($event)" (resizeStart) = "onResizeStart($event)"></ejs-schedule></div> <div style = "width:200px;float:right;margin-left:50px"> <ejs-treeview [fields] = "field" allowDragAndDrop="true" (nodeDragStop) = "onTreeDragStop($event)"> </ejs-treeview></div></div>',

  styleUrls: ['./app.component.css']
})
export class AppComponent {              
  @ViewChild('scheduleObj', {static: false})//scheduleObj, is provided as the id within the schedular template, and this view child is used to acces this id and return the values by the selector. 
  public scheduleInstance: ScheduleComponent; //the schedule instance gets the details from the schedule component.
  
  title = 'my-AI-schedular-app';
  public setView: View = 'Week'
  public setDate: Date = new Date(2019, 0, 17);
  // private eventData: DataManager = new DataManager({
  //   url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData', // uses the already available data, through POST, and binds it to the the angular schedular.
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true

  // });
  public eventObject: EventSettingsModel = {
    // dataSource: this.eventData //uses the data provided by the data manager. Retrived from the remote data Source.

    dataSource: [{
      Id: 1,
      EventTitle: "Code Contribution", 
      EventStart: new Date(2019,0,17,9,0),
      EventEnd: new Date(2019,0,17,12,1),
      // IsBlock: true //particular cell is blocked for crud operations
      // IsReadonly: true //the particular task is read only.
      // RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10" //set intervals of recurrence of the same day for 10 days.
      // IsAllDay: true
    }],
    fields:{
      subject: {name :"EventTitle", default : "Hello, No Task", title: "Enter Title"},
      startTime: {name: "EventStart"},
      endTime:{name: "EventEnd"}
    }
  }
  onDragStart(args: DragEventArgs): void{
    // args.scroll.enable = false;
    // args.scroll.scrollBy = 500; //speed of scrolling as soon as it touches the edges.
    // args.interval = 10; //Drag happens at intervals of 10 mins,, Incase of a free flow drag, interval = 1.
    args.navigation.enable = true; // The appointment spans to the next view of date ranges, on extreme left or right.
    //args.excludeSelectors = 'e-all-day-cells,e-work-cells'; // cannot be dragged or dropped on any work cells or all aday cells.

  }
  onEventStart(args: ResizeEventArgs): void{
    // args.scroll.enable = false; 
    // args.scroll.scrollBy = 500;
    args.interval = 1;

  }
public waitingList: { [key: string]: Object}[] =  [
  {
    Id: 1,
    Name: 'Mathew'
  },
  {
    Id: 2,
    Name: 'Jonathan'
  },
  {
    Id: 3,
    Name: 'Michael'
  },
  {
    Id: 4,
    Name: 'Joseph'
  }

]; //Data source for tree preview.

public field: Object = {dataSource: this.waitingList, id: 'Id', text: 'Name'}; //allocating waitingList to be the data source of the external preview, plus specifying the values that need to be set. 

onTreeDragStop(args: DragAndDropEventArgs): void{
  let cellData: CellClickEventArgs = this.scheduleInstance.getCellDetails(args.target); //this enables us to get the time and the details of the cell dropped with data from the tree preview. (To get the details of the target cells)
  let eventData: { [key: string]: Object } = {
    EventTitle: args.draggedNodeData.text,
    EventStart: cellData.startTime,
    EventEnd: cellData.endTime,
    IsAllDay: cellData.isAllDay
  };//the details got are stored in an array.

  this.scheduleInstance.addEvent(eventData); //the add event is used to save the appointment.

}

  }

