import { useMemo, useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { FiCalendar, FiClock, FiCopy } from 'react-icons/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import CANDIDATES from '../data/candidates';
import '../styles/calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 1, 10, 0),
    end: new Date(2023, 5, 1, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[0],
      CANDIDATES[1],
      CANDIDATES[2],
    ],
  },
  {
    id: 2,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 8, 10, 0),
    end: new Date(2023, 5, 8, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[1],
      CANDIDATES[2],
      CANDIDATES[3],
    ],
  },
  {
    id: 3,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 13, 10, 0),
    end: new Date(2023, 5, 13, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[2],
      CANDIDATES[3],
      CANDIDATES[4],
    ],
  },
  {
    id: 4,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 27, 10, 0),
    end: new Date(2023, 5, 27, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[0],
      CANDIDATES[2],
      CANDIDATES[3],
    ],
  },
  {
    id: 5,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 26, 10, 0),
    end: new Date(2023, 5, 26, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[1],
      CANDIDATES[4],
      CANDIDATES[0],
    ],
  },
  {
    id: 6,
    title: 'Interview with New',
    time: '10:00 AM',
    start: new Date(2023, 5, 2, 10, 0),
    end: new Date(2023, 5, 2, 11, 0),
    candidate: 'New',
    participants: [
      CANDIDATES[3],
      CANDIDATES[1],
      CANDIDATES[2],
    ],
  },
];

function EventCard({ event, continuesPrior, continuesAfter, onClick, isSelected }) {
  return (
    <div 
      className="calendar-event-card" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <div className="calendar-event-title">{event.title}</div>
      <div className="calendar-event-time">{event.time}</div>

      {event.participants && (
        <div className="calendar-event-people" aria-label="Participants">
          {event.participants.map((person, index) => (
            <img
              key={`${event.id}-${person.name}-${index}`}
              className="calendar-attendee"
              src={person.avatar}
              alt={person.name}
              title={person.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CalendarToolbar({ label, onNavigate, onView, view, views }) {
  const viewButtons = ['day', 'week', 'month'];

  return (
    <div className="calendar-toolbar">
      <div className="calendar-nav-group">
        <button className="calendar-nav-arrow" onClick={() => onNavigate('PREV')} aria-label="Previous period">
          {'<'}
        </button>
        <div className="calendar-range-label">{label}</div>
        <button className="calendar-nav-arrow" onClick={() => onNavigate('NEXT')} aria-label="Next period">
          {'>'}
        </button>
      </div>

      <div className="calendar-toolbar-actions">
        <button className="schedule-btn">Schedule</button>
        <div className="calendar-view-buttons">
          {viewButtons.map((item) => (
            <button
              key={item}
              className={`view-pill ${view === item ? 'active' : ''}`}
              onClick={() => onView(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DropdownField({ label, name, value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={wrapperRef}>
      <button
        type="button"
        className={`custom-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value || placeholder}</span>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`custom-dropdown-item ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange({ target: { name, value: option.value } });
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ScheduleEventModal({ isOpen, selectedDate, onClose, candidates }) {
  const [formData, setFormData] = useState({
    candidate: '',
    date: '',
    time: '',
    duration: '',
    eventType: '',
    hiringTeam: [CANDIDATES[0]?.avatar || ''],
    scoreCard: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());

  useEffect(() => {
    if (selectedDate && isOpen) {
      const formattedDate = moment(selectedDate).format('DD MMM YYYY');
      setFormData((prev) => ({
        ...prev,
        date: formattedDate,
      }));
      setPickerDate(new Date(selectedDate));
    }
  }, [selectedDate, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateFieldClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateSelect = (day) => {
    const selected = new Date(pickerDate.getFullYear(), pickerDate.getMonth(), day);
    const formattedDate = moment(selected).format('DD MMM YYYY');
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
    setShowDatePicker(false);
  };

  const handlePrevMonth = () => {
    setPickerDate(new Date(pickerDate.getFullYear(), pickerDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setPickerDate(new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1));
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Convert from Sunday=0 to Monday=0 format
    return day === 0 ? 6 : day - 1;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(pickerDate);
    const firstDay = getFirstDayOfMonth(pickerDate);
    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    // Add week day headers
    const headerRow = weekDays.map((day, i) => (
      <div key={`weekday-${i}`} className="calendar-weekday">
        {day}
      </div>
    ));

    // Add empty cells for days before the first day of the month
    const emptyDays = Array.from({ length: firstDay }).map((_, i) => (
      <div key={`empty-${i}`} className="calendar-day empty"></div>
    ));

    // Add days of the month
    const monthDays = Array.from({ length: daysInMonth }).map((_, i) => {
      const day = i + 1;
      const isSelected =
        formData.date === moment(new Date(pickerDate.getFullYear(), pickerDate.getMonth(), day)).format('DD MMM YYYY');
      return (
        <div
          key={`day-${day}`}
          className={`calendar-day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          {day}
        </div>
      );
    });

    // Add days from next month to fill the grid
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    const nextMonthDays = Array.from({ length: remainingCells }).map((_, i) => (
      <div key={`next-${i}`} className="calendar-day outside-month">
        {i + 1}
      </div>
    ));

    return [...emptyDays, ...monthDays, ...nextMonthDays];
  };

  const handleContinue = () => {
    console.log('Event scheduled:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Schedule event</h2>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Candidates</label>
            <select
              name="candidate"
              value={formData.candidate}
              onChange={handleInputChange}
            className="form-select"
          >
            <option value="">Select candidate</option>
            {candidates.map((candidate) => (
              <option key={candidate.id || candidate.name} value={candidate.name}>
                {candidate.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <div className="date-picker-wrapper">
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              onFocus={handleDateFieldClick}
              className="form-input"
              placeholder="Select date"
              readOnly
            />
            {showDatePicker && (
              <div className="date-picker-dropdown">
                <div className="date-picker-header">
                  <button className="date-picker-nav" onClick={handlePrevMonth}>
                    ‹
                  </button>
                  <div className="date-picker-month">
                    {moment(pickerDate).format('MMMM YYYY')}
                  </div>
                  <button className="date-picker-nav" onClick={handleNextMonth}>
                    ›
                  </button>
                </div>
                <div className="date-picker-grid">{renderCalendarDays()}</div>
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Time</label>
            <DropdownField
              label="Time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              placeholder="Starting Time"
              options={[
                { value: '00:00', label: '00:00' },
                { value: '00:15', label: '00:15' },
                { value: '00:30', label: '00:30' },
                { value: '00:45', label: '00:45' },
                { value: '01:00', label: '01:00' },
                { value: '01:15', label: '01:15' },
                { value: '01:30', label: '01:30' },
                { value: '01:45', label: '01:45' },
              ]}
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <DropdownField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Duration"
              options={[
                { value: '5 minutes', label: '5 minutes' },
                { value: '10 minutes', label: '10 minutes' },
                { value: '15 minutes', label: '15 minutes' },
                { value: '20 minutes', label: '20 minutes' },
                { value: '25 minutes', label: '25 minutes' },
                { value: '30 minutes', label: '30 minutes' },
                { value: '35 minutes', label: '35 minutes' },
                { value: '40 minutes', label: '40 minutes' },
              ]}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-top">
            <div className="form-group form-section-left">
              <label>Event type</label>
              <DropdownField
                label="Event type"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                placeholder="Select event type"
                options={[
                  { value: 'Interview', label: 'Interview' },
                  { value: 'Meeting', label: 'Meeting' },
                  { value: 'Assessment', label: 'Assessment' },
                  { value: 'On-site Interview', label: 'On-site Interview' },
                  { value: 'Phone Interview', label: 'Phone Interview' },
                  { value: 'Zoom Interview', label: 'Zoom Interview' },
                  { value: 'Google Meet Interview', label: 'Google Meet Interview' },
                ]}
              />
            </div>

            <div className="form-group form-section-right">
              <label>Hiring Team</label>
              <div className="hiring-team-container">
                <button className="add-btn">+</button>
                <div className="team-avatars-group">
                  {formData.hiringTeam.map((avatar, index) => (
                    avatar && (
                      <img
                        key={`team-${index}`}
                        src={avatar}
                        alt={`Team member ${index + 1}`}
                        className="team-avatar"
                      />
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group form-section-full">
            <label>Add Score card</label>
            <input
              type="text"
              name="scoreCard"
              value={formData.scoreCard}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Add Score card"
            />
          </div>
        </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-continue" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function AppointmentDetailsModal({ isOpen, event, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: event?.title || '',
    interviewLink: 'https://meet.google.com/axn-tdhg-yod',
    candidateRole: 'Applied for the role of UI Design',
    instruction: 'Submit interview result immediately to hiring manager',
  });

  if (!isOpen || !event) return null;

  const resetFormData = () => {
    setEditFormData({
      title: event.title,
      interviewLink: 'https://meet.google.com/axn-tdhg-yod',
      candidateRole: 'Applied for the role of UI Design',
      instruction: 'Submit interview result immediately to hiring manager',
    });
  };

  const handleEditClick = () => {
    resetFormData();
    setIsEditing(true);
  };

  const handleDiscardChanges = () => {
    setShowDiscardDialog(true);
  };

  const handleConfirmDiscard = () => {
    resetFormData();
    setIsEditing(false);
    setShowDiscardDialog(false);
  };

  const handleSaveChanges = () => {
    console.log('Changes saved:', editFormData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay appointment-modal-overlay">
      {!isEditing && (
        <button className="modal-chevron-btn" onClick={onClose}>
          ›
        </button>
      )}

      {showDiscardDialog && (
        <div className="discard-changes-overlay" onClick={() => setShowDiscardDialog(false)}>
          <div className="discard-changes-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="discard-changes-header">Discard Changes?</div>
            <div className="discard-changes-body">
              <div className="discard-changes-message">You have unsaved changes that will be lost.</div>
              <div className="discard-changes-actions">
                <button className="btn-discard" onClick={handleConfirmDiscard}>Discard Changes</button>
                <button className="btn-discard-cancel" onClick={() => setShowDiscardDialog(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="modal-content appointment-modal">
        <div className="modal-header">
          <div className="modal-header-content">
            {isEditing && (
              <button className="modal-header-close" onClick={handleDiscardChanges} aria-label="Discard changes">
                ×
              </button>
            )}
            <h2>Appointment Details</h2>
          </div>
        </div>

        <div className="modal-body appointment-body">
          {/* Interview Title */}
          <div className="appointment-title-section">
            {isEditing ? (
              <input 
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleInputChange}
                className="form-input edit-title-input"
              />
            ) : (
              <h3>{event.title}</h3>
            )}
            {!isEditing && (
              <div className="appointment-datetime">
                <FiCalendar className="datetime-icon" />
                <span>{moment(event.start).format('dddd, MMMM D YYYY')}</span>
                <span className="datetime-separator">•</span>
                <FiClock className="datetime-icon" />
                <span>{event.time}</span>
              </div>
            )}
          </div>

          {/* Interview Call Link */}
          <div className="appointment-section">
            <h4>Interview Call Link</h4>
            <div className="interview-link-container">
              <input 
                type="text" 
                className="interview-link-input" 
                name="interviewLink"
                value={editFormData.interviewLink}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
              {!isEditing && (
                <>
                  <button className="copy-link-btn" title="Copy link">
                    <FiCopy />
                  </button>
                  <button className="go-to-call-btn">Go to Call Room</button>
                </>
              )}
            </div>
          </div>

          {/* Candidate Card */}
          {!isEditing && event.participants && event.participants[0] && (
            <div className="appointment-section">
              <div className="candidate-card">
                <img src={event.participants[0].avatar} alt={event.participants[0].name} className="candidate-avatar" />
                <div className="candidate-details">
                  <div className="candidate-name">{event.participants[0].name}</div>
                  <div className="candidate-role">{editFormData.candidateRole}</div>
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="appointment-section">
              <label className="form-group-label">Candidate Role</label>
              <input 
                type="text"
                name="candidateRole"
                value={editFormData.candidateRole}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          )}

          {/* Score Card */}
          {!isEditing && (
            <div className="appointment-section">
              <h4>Score Card</h4>
              <div className="score-card-items">
                <div className="score-item">
                  <span className="score-label">Interpersonal Skills</span>
                  <span className="score-description">How good are they at striking up a new conversation? Have they put you at ease.</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Communication Skills</span>
                  <span className="score-description">This covers the verbal and written skills? Are the able to communicate their intent in a clear straightforward manner.</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Communication Skills</span>
                  <span className="score-description">How good are they of solving problems? From small to big problems.</span>
                </div>
              </div>
            </div>
          )}

          {/* Hiring Team */}
          {!isEditing && (
            <div className="appointment-section">
              <h4>Hiring Team</h4>
              <div className="hiring-team-member">
                {event.participants && event.participants[1] && (
                  <>
                    <img src={event.participants[1].avatar} alt={event.participants[1].name} className="team-member-avatar" />
                    <div className="team-member-info">
                      <div className="team-member-name">{event.participants[1].name}</div>
                      <div className="team-member-email">albertflores@gmail.com</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Instruction */}
          <div className="appointment-section">
            <h4>Instruction</h4>
            {isEditing ? (
              <textarea
                name="instruction"
                value={editFormData.instruction}
                onChange={handleInputChange}
                className="form-input edit-instruction-input"
              />
            ) : (
              <p className="instruction-text">{editFormData.instruction}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="appointment-actions">
            {isEditing ? (
              <>
                <button className="btn-cancel" onClick={handleDiscardChanges}>Discard</button>
                <button className="btn-save" onClick={handleSaveChanges}>Save Changes</button>
              </>
            ) : (
              <>
                <button className="btn-edit" onClick={handleEditClick}>Edit</button>
                <button className="btn-notify">Notify Candidates</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
