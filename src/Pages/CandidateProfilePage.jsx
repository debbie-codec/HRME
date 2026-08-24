import { useState } from 'react';
import { FiArrowLeft, FiDownload, FiPaperclip, FiBriefcase, FiUser, FiCalendar, FiMail, FiPhone, FiMapPin, FiLink, FiClock, FiLayers, FiXCircle } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import '../styles/CandidateProfile.css';

const profiles = {
  1: { name: 'Albert Flores', role: 'Product Designer', stage: 'Hired', avatar: 'https://i.pravatar.cc/100?img=12', age: '32', email: 'albertflores@gmail.com', phone: '+234 (81) 521-4533', address: '14th Street, Kejo Lagos, Nigeria', source: 'Hrme website', date: '5th of June, 2023' },
  2: { name: 'Jenny Wilson', role: 'Accountant', stage: 'Interview', avatar: 'https://i.pravatar.cc/100?img=32', age: '29', email: 'jennywilson@gmail.com', phone: '+234 (80) 234-9182', address: 'Lagos, Nigeria', source: 'LinkedIn', date: '8th of June, 2023' },
  3: { name: 'Ralph Edwards', role: 'Ui Designer', stage: 'First Test', avatar: 'https://i.pravatar.cc/100?img=47', age: '32', email: 'ralphedwards@gmail.com', phone: '+234 (81) 521-4533', address: '14th Street, Kejo Lagos, Nigeria', source: 'Hrme website', date: '8th of June, 2023' },
};

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

const Field = ({ label, value }) => {
  const Icon = fieldIcons[label] || FiUser;

  return (
    <div className="profile-field">
      <span className="field-label"><Icon />{label}</span>
      <strong>{value}</strong>
    </div>
  );
};

export default function CandidateProfilePage() {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const candidate = profiles[candidateId] || profiles[1];
  const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(candidate.stage);
  const stageOptions = [
    { label: 'Screening', color: '#7c3aed' },
    { label: 'Interview', color: '#fb923c' },
    { label: 'First Test', color: '#c084fc' },
    { label: 'Hired', color: '#38bdf8' },
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
            <button type="button" className="next-candidate" onClick={() => navigate('/candidates/2/profile')}>
              Next {candidate.name} <FiArrowLeft className="next-arrow" />
            </button>
          </div>
          <div className="profile-layout">
            <section className="profile-main">
                <header className="candidate-summary">
                <img src={candidate.avatar} alt={candidate.name} />
                <div><h1>{candidate.name}</h1><p>Applied for the role of {candidate.role}</p><span>Status <b>{currentStage}</b></span></div>
              </header>
              <nav className="profile-tabs"><button type="button" className="selected">Overview</button><button type="button">Interview</button></nav>
              <section className="profile-section cover-letter"><h2>Cover Letter</h2><div><h3>Application for the role of Ui Designer</h3><p>Dear Hiring Manager,</p><p>I am writing to express my keen interest in the role of {candidate.role} at your company. With a strong background in visual design and a passion for creating intuitive user experiences, I am confident in my ability to contribute to your team.</p><p>Sincerely,<br />{candidate.name}</p></div></section>
              <section className="profile-section"><h2>2 Attachments <button type="button" className="download-all"><FiDownload /> Download All</button></h2><div className="attachments"><div><FiPaperclip /><span>Resume.pdf<small>1.2mb</small></span><FiDownload /></div><div><FiPaperclip /><span>Assignment.zip<small>2.4mb</small></span><FiDownload /></div></div></section>
              <section className="profile-section compact"><h2>Experiences</h2><p>Senior UI/UX Designer at Airbnb</p><small>May 2019 - June 2022 (over 2 years 2 months)</small></section>
              <section className="profile-section compact"><h2>Educations</h2><p>Design Communication Visual at Babcock University</p></section>
              <section className="profile-section skills"><h2>Skills</h2><div><span>User Interface Design</span><span>Mobile App Design</span><span>Responsive Design</span><span>UI Design</span><span>Web Design</span><span>Prototyping</span></div></section>
            </section>
            <aside className="profile-sidebar"><div className="profile-sidebar-heading"><h2>Candidate Profile</h2></div><div className="profile-name-row"><strong>{candidate.name}</strong><button type="button" className="reject-action"><FiXCircle /> Reject</button><div className="advance-wrapper"><button type="button" onClick={() => setIsAdvanceOpen((isOpen) => !isOpen)}>Advance <span className="advance-caret">▾</span></button>{isAdvanceOpen && <div className="advance-menu"><p>Current Stage</p><button type="button" className="stage-option current" onClick={() => setIsAdvanceOpen(false)}><i style={{ backgroundColor: '#9bc27d' }} />{currentStage}</button><p>Move To</p>{stageOptions.map((stage) => <button type="button" className="stage-option" key={stage.label} onClick={() => { setCurrentStage(stage.label); setIsAdvanceOpen(false); }}><i style={{ backgroundColor: stage.color }} />{stage.label}</button>)}</div>}</div></div><h2 className="overview-title">Application Overview</h2><div className="overview-grid"><Field label="Job" value={candidate.role} /><Field label="Stage" value="Assessment" /></div><h2 className="overview-title">Personal Information</h2><div className="fields"><Field label="First Name" value={candidate.name.split(' ')[0]} /><Field label="Last Name" value={candidate.name.split(' ')[1]} /><Field label="Age" value={candidate.age} /><Field label="Email" value={candidate.email} /><Field label="Phone" value={candidate.phone} /><Field label="Address" value={candidate.address} /><Field label="Source" value={candidate.source} /><Field label="Date Applied" value={candidate.date} /><Field label="Socials" value="Instagram Twitter LinkedIn" /><Field label="Experience" value="3 years" /></div></aside>
          </div>
        </main>
      </div>
    </div>
  );
}
