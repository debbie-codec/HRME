import React from 'react';


const INTERVIEWS_DATA = [
  {
    id: 1,
    name: 'Albert Flores',
    role: 'Product Designer',
    time: '10:00-12:40',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 2,
    name: 'Ralph Edwards',
    role: 'Ui Designer',
    time: '10:00-12:40',
    avatar: 'https://i.pravatar.cc/100?img=47',
  },
];

const STAGES_DATA = [
  { id: 1, label: 'New Applied', value: 70, active: false },
  { id: 2, label: 'Screening', value: 88, active: false },
  { id: 3, label: 'First Test', value: 115, active: true },
  { id: 4, label: 'Interview', value: 70, active: false },
  { id: 5, label: 'Hired', value: 82, active: false },
  { id: 6, label: 'Onboard', value: 92, active: false },
];

const GRID_VALUES = [100, 80, 60, 40, 20];

const RESOLVED_TICKETS = [
  { id: 1, openedAt: '2026-08-20T09:00:00', resolvedAt: '2026-08-20T13:30:00' },
  { id: 2, openedAt: '2026-08-21T10:15:00', resolvedAt: '2026-08-21T15:45:00' },
  { id: 3, openedAt: '2026-08-22T08:30:00', resolvedAt: '2026-08-22T11:00:00' },
  { id: 4, openedAt: '2026-08-23T14:00:00', resolvedAt: '2026-08-23T20:00:00' },
];

const getAverageResolutionHours = (tickets) => {
  if (tickets.length === 0) return 0;

  const totalHours = tickets.reduce((total, ticket) => {
    const openedTime = new Date(ticket.openedAt).getTime();
    const resolvedTime = new Date(ticket.resolvedAt).getTime();
    return total + Math.max(0, resolvedTime - openedTime) / (1000 * 60 * 60);
  }, 0);

  return totalHours / tickets.length;
};

const averageResolutionHours = getAverageResolutionHours(RESOLVED_TICKETS);
const averageResolutionLabel = `${Math.floor(averageResolutionHours)}h ${Math.round((averageResolutionHours % 1) * 60)}m`;

export default function DashboardMetrics() {
  return (
    <div className="dashboard-section">
     

      {/* UPCOMING INTERVIEWS */}
      <div className="interviews-card">
        <h3 className="card-title">Upcoming Interviews</h3>
        <div className="interviews-list">
          {INTERVIEWS_DATA.map((candidate) => (
            <div key={candidate.id} className="interview-item">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="interview-avatar"
              />
              <div className="interview-info">
                <span className="candidate-name">{candidate.name}</span>
                <span className="candidate-role">{candidate.role}</span>
              </div>
              <div className="interview-time">
                <svg
                  className="time-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{candidate.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CANDIDATE PER STAGE */}
      <div className="stages-card">
        <div className="stages-header">
          <h3 className="card-title">Candidate Per Stage</h3>
          <button type="button" className="view-more-btn">
            view more
          </button>
        </div>

        <div className="chart-wrapper">
          <div className="chart-grid-lines">
            {GRID_VALUES.map((val) => (
              <div key={val} className="grid-line">
                <span>{val}</span>
              </div>
            ))}
          </div>

          <div className="chart-bars">
            {STAGES_DATA.map((stage) => {
              // Calculates percentage relative to a 120 max scale
              const heightPercent = Math.min((stage.value / 120) * 100, 100);

              return (
                <div
                  key={stage.id}
                  className={`bar-group ${stage.active ? 'active' : ''}`}
                >
                  <div
                    className={`bar ${stage.active ? 'active-bar' : ''}`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    {stage.active && (
                      <div className="bar-tooltip">{stage.value}</div>
                    )}
                  </div>
                  <span
                    className={`bar-label ${
                      stage.active ? 'active-label' : ''
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}