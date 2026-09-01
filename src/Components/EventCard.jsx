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

export default EventCard;
