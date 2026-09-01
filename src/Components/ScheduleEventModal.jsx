import { useEffect, useState } from 'react';
import moment from 'moment';
import DropdownField from './DropdownField';
import CANDIDATES from '../data/candidates';

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
    return day === 0 ? 6 : day - 1;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(pickerDate);
    const firstDay = getFirstDayOfMonth(pickerDate);
    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const headerRow = weekDays.map((day, i) => (
      <div key={`weekday-${i}`} className="calendar-weekday">
        {day}
      </div>
    ));

    const emptyDays = Array.from({ length: firstDay }).map((_, i) => (
      <div key={`empty-${i}`} className="calendar-day empty"></div>
    ));

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

export default ScheduleEventModal;
