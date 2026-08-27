import { useEffect, useState } from 'react';
import { 
  FiArrowLeft, FiDownload, FiBriefcase, FiUser, 
  FiCalendar, FiMail, FiPhone, FiMapPin, FiLink, FiClock, FiLayers, FiXCircle 
} from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import '../styles/CandidateProfile.css';

const profiles = {
  1: { name: 'Albert Flores', role: 'Product Designer', stage: 'Hired', avatar: 'https://i.pravatar.cc/100?img=12', age: '32', email: 'albertflores@gmail.com', phone: '+234 (81) 5214533', address: '14th Street, Ikeja Lagos, Nigeria', source: 'Hrme website', date: '5th of June, 2023' },
  2: { name: 'Jenny Wilson', role: 'Accountant', stage: 'Interview', avatar: 'https://i.pravatar.cc/100?img=32', age: '29', email: 'jennywilson@gmail.com', phone: '+234 (80) 2349182', address: 'Lagos, Nigeria', source: 'LinkedIn', date: '8th of June, 2023' },
  3: { name: 'Ralph Edwards', role: 'UI Design', stage: 'First Test', avatar: 'https://i.pravatar.cc/100?img=47', age: '32', email: 'ralphedwardsee@gmail.com', phone: '+234 (81) 5204153', address: '14th Street, Ikeja Lagos, Nigeria', source: 'Hrme website', date: '5th of June, 2023' },
};

const profileIds = Object.keys(profiles).map(Number);

const fieldIcons = {
  Job: FiBriefcase,
  Stage: FiLayers,
  'First Name': FiUser,
  'Last Name': FiUser,
  Age: FiCalendar,
  Email: FiMail,
  Phone: FiPhone,
  Address: FiMapPin,
  Source: FiLink,
  'Date Applied': FiCalendar,
  Socials: FiLink,
  Experience: FiClock,
};

/* Component using the field-label CSS classes */
const Field = ({ label, value }) => {
  const Icon = fieldIcons[label] || FiUser;

  return (
    <div className="profile-field">
      <div className="field-label">
        <Icon />
        <span>{label}</span>
      </div>
      <div className="field-value">
        {label === 'Socials' ? (
          <div className="social-links">
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        ) : (
          <strong>{value}</strong>
        )}
      </div>
    </div>
  );
};

export default function CandidateProfilePage() {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const candidate = profiles[candidateId] || profiles[3];
  const currentProfileIndex = profileIds.indexOf(Number(candidateId));
  const nextCandidateId = profileIds[(currentProfileIndex + 1) % profileIds.length];
  const nextCandidate = profiles[nextCandidateId];
  const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(candidate.stage);

  useEffect(() => {
    setCurrentStage(candidate.stage);
    setIsAdvanceOpen(false);
  }, [candidate]);

  const stageOptions = [
    { label: 'Screening', color: '#7c3aed' },
    { label: 'Interview', color: '#fb923c' },
    { label: 'First Test', color: '#f59e0b' },
    { label: 'Hired', color: '#10b981' },
    { label: 'On-board', color: '#07519b' },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <TopBar />
        <main className="page-content profile-page">
          <div className="profile-toolbar">
            <button type="button" className="back-link" onClick={() => navigate('/candidates')}>
              <FiArrowLeft /> Back to Candidates
            </button>
            <button type="button" className="next-candidate" onClick={() => navigate(`/candidates/${nextCandidateId}/profile`)}>
              Next {nextCandidate.name} <span className="next-chevron">›</span>
            </button>
          </div>

          <div className="profile-layout">
            {/* Left Card */}
            <section className="profile-main">
              <header className="candidate-summary">
                <img src={candidate.avatar} alt={candidate.name} />
                <div className="summary-info">
                  <h1>{candidate.name}</h1>
                  <p>Applied for the role of {candidate.role}</p>
                  <div className="status-row">
                    <span>Status</span> 
                    <span className="status-badge">
                      <span className="status-dot">●</span> {currentStage}
                    </span>
                  </div>
                </div>
              </header>

              <nav className="profile-tabs">
                <button type="button" className="selected">Overview</button>
                <button type="button">Interview</button>
              </nav>

              <section className="profile-section cover-letter">
                <h2>Cover Letter</h2>
                <div className="section-content">
                  <h3>Application for the role of {candidate.role}</h3>
                  <p>Dear Hiring Manager,</p>
                  <p>I am writing to express my keen interest in the role of {candidate.role} at your company. With a strong background in visual design and a passion for creating intuitive user experiences, I am confident in my ability to contribute to your team. I look forward to the opportunity to discuss how my skills can support your company's goals.</p>
                  <p>Thank you for considering my application.</p>
                  <br />
                  <p>Sincerely,<br />{candidate.name}</p>
                </div>
              </section>

              <section className="profile-section">
                <h2>
                  2 Attachments 
                  <button type="button" className="download-all">
                    <FiDownload /> Download All
                  </button>
                </h2>
                <div className="attachments">
                  <div className="attachment-card">
                    <div className="file-icon pdf">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                    </div>
                    <div className="file-info">
                      <span className="file-name">Resume.pdf</span>
                      <small>1.2mb</small>
                    </div>
                    <FiDownload className="download-icon" />
                  </div>
                  <div className="attachment-card">
                    <div className="file-icon zip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
                    </div>
                    <div className="file-info">
                      <span className="file-name">Assignment.zip</span>
                      <small>2.2mb</small>
                    </div>
                    <FiDownload className="download-icon" />
                  </div>
                </div>
              </section>

              <section className="profile-section compact">
                <h2>Experiences</h2>
                <div className="section-content">
                  <p className="job-title">Senior UI/UX Designer at Airbnb</p>
                  <small>May 2019 - June 2021 (2 years 2 months)</small>
                </div>
              </section>

              <section className="profile-section compact">
                <h2>Educations</h2>
                <div className="section-content">
                  <p className="job-title">Design Communication Visual at Babcock University</p>
                </div>
              </section>

              <section className="profile-section skills">
                <h2>Skills</h2>
                <div className="skills-container">
                  <span>User Interface</span>
                  <span>Mobile App Design</span>
                  <span>Responsive Design</span>
                  <span>UI Design</span>
                  <span>Web Design</span>
                  <span>Prototyping</span>
                </div>
              </section>
            </section>

            {/* Right Card */}
            <aside className="profile-sidebar">
              <div className="profile-sidebar-heading">
                <h2>Candidate Profile</h2>
              </div>

              <div className="profile-name-row">
                <strong>{candidate.name}</strong>
                <button type="button" className="reject-action"><FiXCircle /> Reject</button>
                <div className="advance-wrapper">
                  <button type="button" className="advance-btn" onClick={() => setIsAdvanceOpen((prev) => !prev)}>
                    Advance <span className="advance-caret">▾</span>
                  </button>
                  {isAdvanceOpen && (
                    <div className="advance-menu">
                      <p>Current Stage</p>
                      <button type="button" className="stage-option current" onClick={() => setIsAdvanceOpen(false)}>
                        <i style={{ backgroundColor: '#f59e0b' }} />{currentStage}
                      </button>
                      <p>Move To</p>
                      {stageOptions.map((stage) => (
                        <button key={stage.label} type="button" className="stage-option" onClick={() => { setCurrentStage(stage.label); setIsAdvanceOpen(false); }}>
                          <i style={{ backgroundColor: stage.color }} />{stage.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <h2 className="overview-title">Application Overview</h2>
              <div className="overview-grid">
                <Field label="Job" value={candidate.role} />
                <Field label="Stage" value="Assessment" />
              </div>

              <h2 className="overview-title">Personal Information</h2>
              <div className="fields">
                <Field label="First Name" value={candidate.name.split(' ')[0]} />
                <Field label="Last Name" value={candidate.name.split(' ')[1]} />
                <Field label="Age" value={candidate.age} />
                <Field label="Email" value={candidate.email} />
                <Field label="Phone" value={candidate.phone} />
                <Field label="Address" value={candidate.address} />
                <Field label="Source" value={candidate.source} />
                <Field label="Date Applied" value={candidate.date} />
                <Field label="Socials" value="" />
                <Field label="Experience" value="2years" />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}