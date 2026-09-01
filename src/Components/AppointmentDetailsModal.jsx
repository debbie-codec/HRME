import { FiCalendar, FiClock, FiCopy } from 'react-icons/fi';
import moment from 'moment';

function AppointmentDetailsModal({ isOpen, event, onClose }) {
  if (!isOpen || !event) return null;

  const candidateRole = 'Applied for the role of UI Design';
  const interviewLink = 'https://meet.google.com/axn-tdhg-yod';
  const instruction = 'Submit interview result immediately to hiring manager';

  return (
    <div className="modal-overlay appointment-modal-overlay">
      <button className="modal-chevron-btn" onClick={onClose}>
        ›
      </button>

      <div className="modal-content appointment-modal">
        <div className="modal-header">
          <div className="modal-header-content">
            <h2>Appointment Details</h2>
            <button className="modal-header-close" onClick={onClose} aria-label="Close modal">
              ×
            </button>
          </div>
        </div>

        <div className="modal-body appointment-body">
          {/* Interview Title */}
          <div className="appointment-title-section">
            <h3>{event.title}</h3>
            <div className="appointment-datetime">
              <FiCalendar className="datetime-icon" />
              <span>{moment(event.start).format('dddd, MMMM D YYYY')}</span>
              <span className="datetime-separator">•</span>
              <FiClock className="datetime-icon" />
              <span>{event.time}</span>
            </div>
          </div>

          {/* Interview Call Link */}
          <div className="appointment-section">
            <h4>Interview Call Link</h4>
            <div className="interview-link-container">
              <input 
                type="text" 
                className="interview-link-input" 
                value={interviewLink}
                readOnly
              />
              <button className="copy-link-btn" title="Copy link">
                <FiCopy />
              </button>
              <button className="go-to-call-btn">Go to Call Room</button>
            </div>
          </div>

          {/* Candidate Card */}
          {event.participants && event.participants[0] && (
            <div className="appointment-section">
              <div className="candidate-card">
                <img src={event.participants[0].avatar} alt={event.participants[0].name} className="candidate-avatar" />
                <div className="candidate-details">
                  <div className="candidate-name">{event.participants[0].name}</div>
                  <div className="candidate-role">{candidateRole}</div>
                </div>
              </div>
            </div>
          )}

          {/* Score Card */}
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

          {/* Hiring Team */}
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

          {/* Instruction */}
          <div className="appointment-section">
            <h4>Instruction</h4>
            <p className="instruction-text">{instruction}</p>
          </div>

          {/* Action Buttons */}
          <div className="appointment-actions">
            <button className="btn-notify">Notify Candidates</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsModal;
