import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selectedLeaveType: string = '';

  allEvents = [
    { title: 'Sick Leave', start: '2025-07-15', end: '2025-07-18', color: '#007bff', type: 'Sick' },
    { title: 'Planned Leave', start: '2025-07-21', color: '#28a745', type: 'Casual' },
    { title: 'UnPlanned Leave', start: '2025-07-25', color: '#ffc107', type: 'planned' }
  ];

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: this.allEvents
  };

  filterEvents() {
    const filtered = this.selectedLeaveType
      ? this.allEvents.filter(event => event.type === this.selectedLeaveType)
      : this.allEvents;

    this.calendarOptions.events = filtered;
  }
}
