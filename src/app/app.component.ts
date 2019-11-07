import { Component, ViewEncapsulation, ViewChild} from '@angular/core';
import { View, EventSettingsModel, DragEventArgs, ResizeEventArgs, ScheduleComponent, CellClickEventArgs, CellTemplateArgs, getWeekNumber, GroupModel} from '@syncfusion/ej2-angular-schedule';
// import { DataManager, WebApiAdaptor} from '@syncfusion/ej2-data'; //import enables using tasks from a remote data source, which is the ej2 data repository.  
import { DragAndDropEventArgs} from '@syncfusion/ej2-angular-navigations';
import {L10n, Internationalization} from '@syncfusion/ej2-base';

L10n.load({
  'en-US' :{
    'schedule':{
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Remove',
      'newEvent': 'Add a new Task Event'
    }
  }
});

@Component({
  selector: 'app-root',
  template: 
  `<div> 
  <div style = "float:left"> 
  <ejs-schedule #scheduleObj  [eventSettings]="eventObject" [selectedDate]="setDate" [currentView]="setView" (dragStart) = "onDragStart($event)" (resizeStart) = "onResizeStart($event)" [group] = "groupData">
  
  <e-resources>

    <e-resource field = "ResourceID" title = "Resource Name" name = "Resources" textField = "Name" idField = "Id" colorField = "Color" [dataSource]="resourceDataSource">
    </e-resource>

    <e-resource field = "GroupID" title = "Group Name" name = "Groups" 
    [dataSource]="GroupDataSource" [allowMultiple] = "allowMultipleResource"
    textField = "Name" idField = "Id" colorField = "Color" groupIDField = "GroupID" >
    </e-resource>

  </e-resources>

  <e-header-rows>
  <e-header-row option = 'Month'>
    <ng-template #template let-data>
      <span [innerHTML]="getMonthDetails(data)"> </span>
    </ng-template>
  </e-header-row>
  <e-header-row option = 'Week'>
  <ng-template #template let-data>
  <span [innerHTML]="getWeekDetails(data)"> </span>
</ng-template>
  </e-header-row>
  <e-header-row option = 'Date'></e-header-row>
  <e-header-row option = 'Hour'></e-header-row>
  </e-header-rows>  



      <e-views>
        <e-view option = 'Day' startHour = '07:00' endHour = '17:00'> </e-view> //Once you remove [views]="setViews" from ejs-schedule tag, it will display only the day view.
        <e-view option = 'Week'> 

        </e-view>
        <e-view option = 'WorkWeek' isSelected = 'true'> </e-view>
        <e-view option = 'Month' showWeekNumber = 'true' > 

        </e-view>
        <e-view option = 'TimelineMonth'  interval = '12'> </e-view>
        <e-view option = 'TimelineDay'> </e-view>
        <e-view option = 'TimelineWeek'> </e-view>
      </e-views>

  </ejs-schedule>
  </div> 
  
  <div style = "width:200px;float:right;margin-left:50px"> 
  <ejs-treeview [fields] = "field" allowDragAndDrop="true" (nodeDragStop) = "onTreeDragStop($event)"> 
  </ejs-treeview>
  </div>

  </div>`,

  styleUrls: ['./app.component.css']
})
export class AppComponent {              
  @ViewChild('scheduleObj', {static: false})//scheduleObj, is provided as the id within the schedular template, and this view child is used to acces this id and return the values by the selector. 
  public scheduleInstance: ScheduleComponent; //the schedule instance gets the details from the schedule component.
  
  title = 'my-AI-schedular-app';
  public instance: Internationalization = new Internationalization(); //In order to format the date we need to first import the internalization standards.
  getMonthDetails(value: CellTemplateArgs): //defining the getMonthDetails method to return the date string passed to the header row of months.
  string{ 
    return this.instance.formatDate((value as CellTemplateArgs).date, {skeleton: 'yMMMM'}); //defining the date formart skeleton to be returned
  }

  getWeekDetails(value: CellTemplateArgs):string{ 
    return 'week' + getWeekNumber((value as CellTemplateArgs).date); //getWeekNumber is already defined in the schedular and can be accessed directly.
  }

  public dateParser(data: string){//for proper time conversion for the editor window time picker.
    return new Date(data);
  }

  public statusFields: Object = {text: 'StatusText', value: 'StatusText'};
  public StatusData: Object[] = [ 
    {StatusText: 'Important'},
    {StatusText: 'Urgent'},
    {StatusText: 'Important and Urgent'},
    {StatusText: 'Not Important and Not Urgent'}
  ];
  public setView: View = 'Week'
  public setDate: Date = new Date(2019, 0, 8);
  public allowMultipleResource: Boolean = true;
  public resourceDataSource: Object[] = [
    {Name: 'Mathew', Id: 1, Color: '#ffaa00'},
    {Name: 'Jonathan', Id: 2, Color: '#f8a398'},
    {Name: 'Michael', Id: 3, Color: '#7499e1'},
    {Name: 'Joseph', Id: 4, Color: '#ffbb11'}
  ]
  public GroupDataSource: Object[] = [
    {Name: 'Group 1', Id: 1, Color: 'purple', GroupID: 1},
    {Name: 'Group 2', Id: 2, Color: 'green', GroupID: 2},
    {Name: 'Group 3', Id: 3, Color: 'Black', GroupID: 2},
    {Name: 'Group 4', Id: 4, Color: 'blue', GroupID: 4}
  ];

  /**
   * To group, the diffrent resources, we import the group model.
   */
  public groupData: GroupModel =  {
    resources: ['Resources', 'Groups'], //accepts the string of resoures.
    allowGroupEdit:true //Allows when creating a task with multiple resources they will all be created together and be linked when performing crud operations on one.
    //byDate:true //This aligns the resources under each date.
    //enableCompactView: false //This removes the compact view in mobile mode.

  };
  
  // private eventData: DataManager = new DataManager({
  //   url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData', // uses the already available data, through POST, and binds it to the the angular schedular.
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true

  // });

  //public setViews: View[]= ["Day", "Month", "TimelineMonth", "TimelineDay", "TimelineWeek"]; //set custom views that you need to display.


  public eventObject: EventSettingsModel = {
    // dataSource: this.eventData //uses the data provided by the data manager. Retrived from the remote data Source.

    dataSource: [{
      Id: 1,
      EventTitle: "Code Contribution", 
      EventStart: new Date(2019,0,8,9,0),
      EventEnd: new Date(2019,0,8,10,0),
      Location: "To Github",
      ResourceID: 1,
      GroupID: 1
      // IsBlock: true //particular cell is blocked for crud operations
      // IsReadonly: true //the particular task is read only.
      // RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10" //set intervals of recurrence of the same day for 10 days.
      // IsAllDay: true
    },
    {
      Id: 2,
      EventTitle: "On Vacation", 
      EventStart: new Date(2019,0,7,9,0),
      EventEnd: new Date(2019,0,7,10,0),
      Location: "Italy",
      ResourceID: 2,
      GroupID: 3

    }
  ],
    fields:{
      subject: {name :"EventTitle", default : "No Task Name...", title: "Enter Title"},
      startTime: {name: "EventStart"},
      endTime:{name: "EventEnd"},
      location:{name: "Location"},
      
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

// public waitingList: { [key: string]: Object}[] =  [
//   {
//     Id: 1,
//     Name: 'Dev Team'
//   },
//   {
//     Id: 2,
//     Name: 'Business Team'
//   },
//   {
//     Id: 3,
//     Name: 'Operations Team'
//   },
//   {
//     Id: 4,
//     Name: 'Support Team'
//   }

// ]; //Data source for tree preview.

// public field: Object = {dataSource: this.waitingList, id: 'Id', text: 'Name' }; //allocating waitingList to be the data source of the external preview, plus specifying the values that need to be set. 

// onTreeDragStop(args: DragAndDropEventArgs): void{
//   let cellData: CellClickEventArgs = this.scheduleInstance.getCellDetails(args.target); //this enables us to get the time and the details of the cell dropped with data from the tree preview. (To get the details of the target cells)
//   let eventData: { [key: string]: Object } = {
//     EventTitle: args.draggedNodeData.text,
//     EventStart: cellData.startTime,
//     EventEnd: cellData.endTime,
//     IsAllDay: cellData.isAllDay
//   };//the details got are stored in an array.

//   this.scheduleInstance.addEvent(eventData); //the add event is used to save the appointment.

// }

  }

