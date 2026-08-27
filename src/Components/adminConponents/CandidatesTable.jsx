import { useEffect, useState } from 'react';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import FilterModal from './FilterModal';
import SHARED_CANDIDATES from '../../data/candidates';

const TABS = [
  { id: 'all', label: 'All Candidates', count: 10 },
  { id: 'qualified', label: 'Qualified Candidates', count: 6 },
  { id: 'inactive', label: 'Inactive Candidates', count: 3 },
];

const LEGACY_CANDIDATES_DATA = [
  {
    id: 1,
    name: 'Albert Flores',
    avatar: 'https://i.pravatar.cc/100?img=12',
    stage: 'Hired',
    stageColor: '#10b981', // Green
    dateApplied: '06/16/2023',
    location: 'Abuja',
    jobApplied: 'Product Designer',
    hiringTeam: 'Development',
    type: 'Remote,Hybrid',
    status: 'New',
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    avatar: 'https://i.pravatar.cc/100?img=32',
    stage: 'Interview',
    stageColor: '#2563eb', // Blue
    dateApplied: '06/18/2023',
    location: 'Lagos',
    jobApplied: 'Accountant',
    hiringTeam: 'Accounting',
    type: 'Hybrid',
    status: 'Qualified',
  },
  {
    id: 3,
    name: 'Ralph Edwards',
    avatar: 'https://i.pravatar.cc/100?img=47',
    stage: 'First Test',
    stageColor: '#f59e0b', // Orange
    dateApplied: '06/20/2023',
    location: 'Ibadan',
    jobApplied: 'Ui Designer',
    hiringTeam: 'Development',
    type: 'Remote',
    status: 'Disqualified',
  },
];

const CANDIDATES_DATA = SHARED_CANDIDATES;

export default function CandidatesTable({ maxRows }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);

  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredCandidates.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStatusToggle = (statusName) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusName)
        ? prev.filter((item) => item !== statusName)
        : [...prev, statusName]
    );
  };

  const handleMenuClick = (event, candidateId) => {
    event.stopPropagation();
    setMenuOpen((current) => (current === candidateId ? null : candidateId));
    const actionBounds = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: actionBounds.right, y: actionBounds.bottom });
  };

  useEffect(() => {
    if (menuOpen === null) return undefined;

    const closeMenu = () => setMenuOpen(null);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  const filteredCandidates = CANDIDATES_DATA.filter((candidate) => {
    if (activeTab !== 'all' && candidate.category !== activeTab) return false;
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(candidate.status)) return false;
    if (selectedJob !== '' && candidate.jobApplied !== selectedJob) return false;
    if (selectedStage !== '' && candidate.stage !== selectedStage) return false;
    if (selectedExperience !== '' && candidate.experience !== selectedExperience) return false;
    if (selectedSource !== '' && candidate.source !== selectedSource) return false;
    return true;
  });

  return (
    <div className="candidates-container">
      {/* HEADER SECTION */}
      <div className="candidates-header">
        <h2 className="candidates-title">Candidates</h2>
        <div className="header-actions">
          <button 
            type="button" 
            className="view-more-btn"
            onClick={() => navigate('/candidates')}
          >
            View More
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="candidates-tabs">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <span className={`tab-count ${isActive ? 'active-count' : ''}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="candidates-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={
                    selectedIds.length === filteredCandidates.length &&
                    filteredCandidates.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Candidate</th>
              <th>Stage</th>
              <th>Date Applied</th>
              <th>Location</th>
              <th>Job Applied</th>
              <th>Hiring Team</th>
              <th>Type</th>
              <th style={{ width: '30px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.slice(0, maxRows || filteredCandidates.length).map((row) => {
              const isSelected = selectedIds.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={isSelected ? 'selected-row' : ''}
                  onClick={() => navigate(`/candidates/${row.id}/profile`)}
                >
                  <td>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(row.id)}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </td>
                  <td>
                    <div className="candidate-cell">
                      <img
                        src={row.avatar}
                        alt={row.name}
                        className="candidate-avatar"
                      />
                      <span className="candidate-name">{row.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stage-cell">
                      <span
                        className="stage-dot"
                        style={{ backgroundColor: row.stageColor }}
                      />
                      <span className="stage-text">{row.stage}</span>
                    </div>
                  </td>
                  <td className="text-secondary">{row.dateApplied}</td>
                  <td className="text-secondary">{row.location}</td>
                  <td className="text-secondary">{row.jobApplied}</td>
                  <td className="text-secondary">{row.hiringTeam}</td>
                  <td className="text-secondary">{row.type}</td>
                  <td>
                    <button
                      type="button"
                      className="action-btn"
                      aria-label={`Actions for ${row.name}`}
                      onClick={(event) => handleMenuClick(event, row.id)}
                    >
                      <FiMoreVertical />
                    </button>
                    {menuOpen === row.id && createPortal(
                      <div className="context-menu" style={{ top: menuPosition.y, left: menuPosition.x }} onClick={(event) => event.stopPropagation()}>
                        <button type="button" className="context-menu-item" onClick={() => setMenuOpen(null)}>
                          <FiEdit2 /> Change Status
                        </button>
                        <button type="button" className="context-menu-item delete" onClick={() => setMenuOpen(null)}>
                          <FiTrash2 /> Delete Information
                        </button>
                      </div>,
                      document.body
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FILTER MODAL POPUP */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedStatuses={selectedStatuses}
        onStatusChange={handleStatusToggle}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        candidateData={CANDIDATES_DATA}
        onClear={() => {
          setSelectedStatuses([]);
          setSelectedJob('');
          setSelectedStage('');
          setSelectedExperience('');
          setSelectedSource('');
        }}
      />
    </div>
  );
}