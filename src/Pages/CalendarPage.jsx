import { useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import EventCard from '../Components/EventCard';
import CalendarToolbar from '../Components/CalendarToolbar';
import ScheduleEventModal from '../Components/ScheduleEventModal';
import AppointmentDetailsModal from '../Components/AppointmentDetailsModal';
import CANDIDATES from '../data/candidates';
import events from '../data/eventsData';
import '../styles/calendar.css';

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [calendarDate, setCalendarDate] = useState(new Date(2023, 5, 1));
  const [calendarView, setCalendarView] = useState('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAppointmentDetailsOpen, setIsAppointmentDetailsOpen] = useState(false);

  const formattedDate = useMemo(() => {
    const start = moment(calendarDate).startOf('month');
    const end = moment(calendarDate).endOf('month');
    return `${start.format('Do MMMM, YYYY')} - ${end.format('Do MMMM, YYYY')}`;
  }, [calendarDate]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsAppointmentDetailsOpen(true);
  };

  return (
    <div className="dash calendar-page">
      <Sidebar />
      <main className="main">
        <TopBar />
        <div className="calendar-shell">
          <div className="calendar-main-panel">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              date={calendarDate}
              view={calendarView}
              onNavigate={(newDate) => setCalendarDate(newDate)}
              onView={(newView) => setCalendarView(newView)}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              selectable
              views={['day', 'week', 'month']}
              popup={false}
              step={60}
              timeslots={1}
              formats={{
                weekdayFormat: 'dddd',
                monthHeaderFormat: 'MMMM YYYY',
                dayRangeHeaderFormat: ({ start, end }) => `${moment(start).format('D MMMM')} - ${moment(end).format('D MMMM')}`,
              }}
              components={{
                toolbar: (props) => (
                  <CalendarToolbar
                    label={formattedDate}
                    onNavigate={props.onNavigate}
                    onView={props.onView}
                    view={calendarView}
                    views={props.views}
                  />
                ),
                event: EventCard,
              }}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  padding: 0,
                },
              })}
              dayPropGetter={() => ({
                style: {
                  backgroundColor: '#ffffff',
                },
              })}
              className="calendar-widget"
            />
          </div>
        </div>
        <ScheduleEventModal
          isOpen={isModalOpen}
          selectedDate={selectedDate}
          onClose={() => setIsModalOpen(false)}
          candidates={CANDIDATES}
        />
        <AppointmentDetailsModal
          isOpen={isAppointmentDetailsOpen}
          event={selectedEvent}
          onClose={() => setIsAppointmentDetailsOpen(false)}
        />
      </main>
    </div>
  );
}
