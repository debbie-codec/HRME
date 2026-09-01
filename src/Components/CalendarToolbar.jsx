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

export default CalendarToolbar;
