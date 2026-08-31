import { useState, useEffect } from 'react';
import { FiDownload, FiFilter, FiMoreVertical, FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2, FiFileText, FiPrinter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

// COMPONENTS
import Sidebar from "../Components/adminConponents/Sidebar";
import TopBar from "../Components/adminConponents/Topbar";
import FilterModal from "../Components/adminConponents/FilterModal";
import SHARED_CANDIDATES from '../data/candidates';
// STYLES
import "../styles/CandidatesTable.css";

const LEGACY_INITIAL_CANDIDATES = [
  {
    id: 1,
    name: 'Albert Flores',
    avatar: 'https://i.pravatar.cc/100?img=12',
    stage: 'New Applied',
    stageColor: '#10b981',
    category: 'all',
    dateApplied: '06/16/2023',
    location: 'Abuja',
    jobApplied: 'Product Designer',
    hiringTeam: 'Development',
    type: 'Remote,Hybrid',
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    avatar: 'https://i.pravatar.cc/100?img=32',
    stage: 'Interview',
    stageColor: '#2563eb',
    category: 'qualified',
    dateApplied: '06/18/2023',
    location: 'Lagos',
    jobApplied: 'Accountant',
    hiringTeam: 'Accounting',
    type: 'Hybrid',
  },
  {
    id: 3,
    name: 'Ralph Edwards',
    avatar: 'https://i.pravatar.cc/100?img=47',
    stage: 'First Test',
    stageColor: '#f59e0b',
    category: 'all',
    dateApplied: '06/20/2023',
    location: 'Ibadan',
    jobApplied: 'Ui Designer',
    hiringTeam: 'Development',
    type: 'Remote',
  },
  {
    id: 4,
    name: 'Albert Flores',
    avatar: 'https://i.pravatar.cc/100?img=12',
    stage: 'Screening',
    stageColor: '#8b5cf6',
    category: 'rejected',
    dateApplied: '06/16/2023',
    location: 'Abuja',
    jobApplied: 'Product Designer',
    hiringTeam: 'Development',
    type: 'Remote,Hybrid',
  },
  {
    id: 5,
    name: 'Jenny Wilson',
    avatar: 'https://i.pravatar.cc/100?img=32',
    stage: 'On-board',
    stageColor: '#10b981',
    category: 'qualified',
    dateApplied: '06/18/2023',
    location: 'Lagos',
    jobApplied: 'Accountant',
    hiringTeam: 'Accounting',
    type: 'Hybrid',
  },
  {
    id: 6,
    name: 'Ralph Edwards',
    avatar: 'https://i.pravatar.cc/100?img=47',
    stage: 'New Applied',
    stageColor: '#ef4444',
    category: 'rejected',
    dateApplied: '06/20/2023',
    location: 'Ibadan',
    jobApplied: 'Ui Designer',
    hiringTeam: 'Development',
    type: 'Remote',
  },
  {
    id: 7,
    name: 'Cameron Williamson',
    avatar: 'https://i.pravatar.cc/100?img=5',
    stage: 'Interview',
    stageColor: '#2563eb',
    category: 'qualified',
    dateApplied: '06/21/2023',
    location: 'Port Harcourt',
    jobApplied: 'Product Manager',
    hiringTeam: 'Operations',
    type: 'Hybrid',
  },
  {
    id: 8,
    name: 'Kristin Watson',
    avatar: 'https://i.pravatar.cc/100?img=9',
    stage: 'Screening',
    stageColor: '#8b5cf6',
    category: 'all',
    dateApplied: '06/22/2023',
    location: 'Abuja',
    jobApplied: 'UX Researcher',
    hiringTeam: 'Development',
    type: 'Remote',
  },
  {
    id: 9,
    name: 'Courtney Henry',
    avatar: 'https://i.pravatar.cc/100?img=25',
    stage: 'Hired',
    stageColor: '#10b981',
    category: 'qualified',
    dateApplied: '06/23/2023',
    location: 'Lagos',
    jobApplied: 'Frontend Developer',
    hiringTeam: 'Engineering',
    type: 'Remote',
  },
  {
    id: 10,
    name: 'Darlene Robertson',
    avatar: 'https://i.pravatar.cc/100?img=20',
    stage: 'First Test',
    stageColor: '#f59e0b',
    category: 'all',
    dateApplied: '06/24/2023',
    location: 'Ibadan',
    jobApplied: 'Data Analyst',
    hiringTeam: 'Finance',
    type: 'Hybrid',
  },
  {
    id: 11,
    name: 'Esther Howard',
    avatar: 'https://i.pravatar.cc/100?img=30',
    stage: 'On-board',
    stageColor: '#10b981',
    category: 'qualified',
    dateApplied: '06/25/2023',
    location: 'Benin City',
    jobApplied: 'HR Manager',
    hiringTeam: 'People',
    type: 'Remote',
  },
  {
    id: 12,
    name: 'Wade Warren',
    avatar: 'https://i.pravatar.cc/100?img=11',
    stage: 'Screening',
    stageColor: '#8b5cf6',
    category: 'rejected',
    dateApplied: '06/26/2023',
    location: 'Enugu',
    jobApplied: 'UI Designer',
    hiringTeam: 'Design',
    type: 'Hybrid',
  },
];

const INITIAL_CANDIDATES = SHARED_CANDIDATES;

export default function CandidatesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Filter Modal State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Context Menu State
  const [menuOpen, setMenuOpen] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Dynamic Filtering Logic
  const filteredCandidates = INITIAL_CANDIDATES.filter((candidate) => {
    // Tab filter
    if (activeTab !== 'all' && candidate.category !== activeTab) return false;
    
    // Status filter
    const candidateStatus = candidate.status
      || (candidate.category === 'qualified' ? 'Qualified'
        : candidate.category === 'rejected' ? 'Disqualified'
          : candidate.stage === 'New Applied' ? 'New' : 'Overdue');
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(candidateStatus)) return false;
    
    // Job filter
    if (selectedJob && candidate.jobApplied !== selectedJob) return false;
    
    // Stage filter
    if (selectedStage && candidate.stage !== selectedStage) return false;
    if (selectedExperience && candidate.experience !== selectedExperience) return false;
    if (selectedSource && candidate.source !== selectedSource) return false;
    
    return true;
  });

  // Dynamic Tab Counts
  const counts = {
    all: INITIAL_CANDIDATES.length,
    qualified: INITIAL_CANDIDATES.filter((c) => c.category === 'qualified').length,
    rejected: INITIAL_CANDIDATES.filter((c) => c.category === 'rejected').length,
  };
  const pageCount = Math.max(1, Math.ceil(filteredCandidates.length / pageSize));
  const displayedCandidates = filteredCandidates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Selection Handlers
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

  // Filter Status Handler
  const handleStatusToggle = (statusName) => {
    setSelectedStatuses((prev) =>
      prev.includes(statusName)
        ? prev.filter((item) => item !== statusName)
        : [...prev, statusName]
    );
  };

  // Context Menu Handler
  const handleMenuClick = (e, candidateId) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === candidateId ? null : candidateId);
    const actionBounds = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: actionBounds.right,
      y: actionBounds.bottom,
    });
  };

  const handleChangeStatus = (candidateId) => {
    alert(`Change status for candidate ${candidateId}`);
    setMenuOpen(null);
  };

  const handleDeleteInformation = (candidateId) => {
    alert(`Delete information for candidate ${candidateId}`);
    setMenuOpen(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setMenuOpen(null);
    };
    
    if (menuOpen !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpen]);

  const tabs = [
    { id: 'all', label: 'All Candidates', count: counts.all },
    { id: 'qualified', label: 'Qualified Candidates', count: counts.qualified },
    { id: 'rejected', label: 'Rejected Candidates', count: counts.rejected },
  ];

  return (
    <div className="app-layout">
      {/* SIDE NAVIGATION */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="main-wrapper">
        {/* TOP NAVBAR */}
        {!isFilterOpen && <TopBar />}

        {/* CANDIDATES PAGE CONTENT */}
        <main className="page-content">
          <div className="candidates-container">
            {/* HEADER SECTION */}
            <div className="candidates-header">
              <h2 className="candidates-title">Candidates</h2>
              <div className="header-actions">
                <div className="export-menu-wrapper">
                  <button
                    type="button"
                    className="action-btn-outline"
                    aria-expanded={isExportOpen}
                    onClick={() => setIsExportOpen((isOpen) => !isOpen)}
                  >
                    <FiDownload /> Export
                  </button>
                  {isExportOpen && (
                    <div className="export-menu" role="menu">
                      <button type="button" className="export-menu-item" role="menuitem" onClick={() => setIsExportOpen(false)}>
                        <FiFileText className="export-icon csv" /> Export .CSV
                      </button>
                      <button type="button" className="export-menu-item active" role="menuitem" onClick={() => setIsExportOpen(false)}>
                        <FiFileText className="export-icon excel" /> Export Excel
                      </button>
                      <button type="button" className="export-menu-item" role="menuitem" onClick={() => setIsExportOpen(false)}>
                        <FiFileText className="export-icon pdf" /> Export PDF
                      </button>
                      <button type="button" className="export-menu-item" role="menuitem" onClick={() => setIsExportOpen(false)}>
                        <FiPrinter className="export-icon print" /> Print
                      </button>
                    </div>
                  )}
                </div>
                <button 
  type="button" 
  className="action-btn-outline"
  onClick={() => setIsFilterOpen(true)} 
>
  <FiFilter /> Filters
</button>
                
              </div>
            </div>

            {/* FILTER TABS */}
            <div className="candidates-tabs">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedIds([]); // Clear selection when switching tabs
                    }}
                  >
                    <span>{tab.label}</span>
                    <span className={`tab-count ${isActive ? 'active-count' : ''}`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* DATA TABLE */}
            <div className="table-responsive">
              <table className="candidates-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>
                      <input
                        type="checkbox"
                        checked={
                          selectedIds.length === filteredCandidates.length &&
                          filteredCandidates.length > 0
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Candidate</th>
                    <th>Status</th>
                    <th>Date Applied</th>
                    <th>Location</th>
                    <th>Job Applied</th>
                    <th>Hiring Team</th>
                    <th>Type</th>
                    <th style={{ width: '30px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length > 0 ? (
                    displayedCandidates.map((row) => {
                      const isSelected = selectedIds.includes(row.id);
                      return (
                        <tr
                          key={row.id}
                          onClick={() => navigate(`/candidates/${row.id}/profile`)}
                          className={isSelected ? 'selected-row' : ''}
                        >
                          <td>
                            <input
                              type="checkbox"
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
                              <span>{row.name}</span>
                            </div>
                          </td>
                          <td>
                            <span
                              className="stage-dot"
                              style={{ backgroundColor: row.stageColor }}
                            />
                            {row.stage}
                          </td>
                          <td>{row.dateApplied}</td>
                          <td>{row.location}</td>
                          <td>{row.jobApplied}</td>
                          <td>{row.hiringTeam}</td>
                          <td>{row.type}</td>
                          <td>
                            <button 
                              type="button" 
                              className="menu-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMenuClick(e, row.id);
                              }}
                            >
                              <FiMoreVertical />
                            </button>
                            {menuOpen === row.id && createPortal(
                              <div className="context-menu" style={{ top: menuPosition.y, left: menuPosition.x }}>
                                <button 
                                  type="button" 
                                  className="context-menu-item"
                                  onClick={() => handleChangeStatus(row.id)}
                                >
                                  <FiEdit2 /> Change Status
                                </button>
                                <button 
                                  type="button" 
                                  className="context-menu-item delete"
                                  onClick={() => handleDeleteInformation(row.id)}
                                >
                                  <FiTrash2 /> Delete Information
                                </button>
                              </div>,
                              document.body
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '32px' }}>
                        No candidates found in this stage.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* FOOTER & PAGINATION */}
            <div className="pagination-container">
                <div className="pagination-size">
                  <span>Showing</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="page-select"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>{Math.min(pageSize, filteredCandidates.length)} of {filteredCandidates.length}</span>
                </div>

                <div className="pagination-controls">
                  <button
                    type="button"
                    className="page-nav-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  >
                    <FiChevronLeft />
                  </button>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                    <button
                      type="button"
                      key={page}
                      className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="page-nav-btn"
                    disabled={currentPage === pageCount}
                    onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                  >
                    <FiChevronRight />
                  </button>
                </div>
            </div>
          </div>
        </main>
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
        candidateData={INITIAL_CANDIDATES}
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