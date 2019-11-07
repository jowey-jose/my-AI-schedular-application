import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, DragAndDropService,ResizeService, TimelineViewsService, TimelineMonthService} from '@syncfusion/ej2-angular-schedule';
import  { TreeViewModule} from '@syncfusion/ej2-angular-navigations'; //Installs all navigation packages, but only intrested with with tree view preview only.
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns'
import {DateTimePickerModule} from '@syncfusion/ej2-angular-calendars'

@NgModule({
  declarations: [    AppComponent
  ],
  imports: [
    BrowserModule,
    ScheduleModule, RecurrenceEditorModule, TreeViewModule, DropDownListModule, DateTimePickerModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, DragAndDropService, ResizeService, TimelineViewsService, TimelineMonthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
