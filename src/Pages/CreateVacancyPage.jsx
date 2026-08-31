import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiChevronDown } from 'react-icons/fi';
import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import '../styles/dashboard.css';
import '../styles/CreateVacancy.css';

const jobs = [
  {
    id: 1,
    title: 'Ux Designer',
    dateRange: '06/07/-07/08/2023',
    status: 'Published',
    statusColor: '#10b981',
    description: 'Position Overview:\nAs a Junior UX Designer, you will be responsible for assisting in the design and development of user experiences for various digital products and services. Working closely with senior designers and cross-functional teams, you will contribute to creating intuitive and engaging designs.\n\nKey Responsibilities:\n1. Assist in the development and execution of user-centered design processes, including user research, persona development, and usability testing.\n2. Collaborate with senior designers, product managers, and developers to create wireframes, prototypes, and visual designs that align with project objectives.\n3. Contribute to the creation and maintenance of design systems and patterns to ensure consistency across different products and platforms.\n4. Participate in design reviews and provide constructive feedback to improve design quality.\n5. Assist in conducting user testing sessions, analyzing data, and implementing insights to refine and enhance user experiences.\n6. Support the creation of engaging interface concepts and visual assets for web and mobile experiences across the product team.\n7. Help document design decisions, user insights, and project updates to keep stakeholders aligned and informed throughout each stage of delivery.\n8. Stay current with UX trends, accessibility best practices, and product design tools to continuously improve the quality and consistency of design work.',
    jobTitle: 'Junior UX Designer',
    endPeriod: '18/08/2023',
    location: 'Lagos',
    experience: '1-2 years',
    salary: '500K',
    hiringTeam: 'Ralph Edwards',
    jobType: 'Remote',
    tags: ['Full-time', 'Contract'],
    candidates: [
      { id: 1, name: 'Albert Flores', avatar: 'https://i.pravatar.cc/100?img=12', rating: 5, daysAgo: '2 days ago', stage: 'New Applied' },
      { id: 2, name: 'Guy Hawkins', avatar: 'https://i.pravatar.cc/100?img=15', rating: 5, daysAgo: '2 days ago', stage: 'Screening' },
      { id: 3, name: 'Darrell Ward', avatar: 'https://i.pravatar.cc/100?img=18', rating: 4, daysAgo: '2 days ago', stage: 'Interview' },
      { id: 4, name: 'Albert Fol', avatar: 'https://i.pravatar.cc/100?img=21', rating: 4, daysAgo: '2 days ago', stage: 'Tests' },
      { id: 5, name: 'Jacob Jones', avatar: 'https://i.pravatar.cc/100?img=14', rating: 4, daysAgo: '2 days ago', stage: 'Hired' },
      { id: 6, name: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/100?img=32', rating: 3, daysAgo: '2 days ago', stage: 'New Applied' },
      { id: 7, name: 'Annette Black', avatar: 'https://i.pravatar.cc/100?img=35', rating: 5, daysAgo: '2 days ago', stage: 'Screening' },
      { id: 8, name: 'Arlene Coy', avatar: 'https://i.pravatar.cc/100?img=31', rating: 5, daysAgo: '2 days ago', stage: 'Interview' },
      { id: 9, name: 'Albert Flores', avatar: 'https://i.pravatar.cc/100?img=12', rating: 3, daysAgo: '2 days ago', stage: 'Hired' },
      { id: 10, name: 'Devon Lane', avatar: 'https://i.pravatar.cc/100?img=23', rating: 4, daysAgo: '2 days ago', stage: 'Interview' },
      { id: 11, name: 'Robert Fox', avatar: 'https://i.pravatar.cc/100?img=45', rating: 3, daysAgo: '2 days ago', stage: 'Interview' },
      { id: 12, name: 'Theresa Webb', avatar: 'https://i.pravatar.cc/100?img=29', rating: 5, daysAgo: '2 days ago', stage: 'Screening' }
    ]
  }
];

const Field = ({ label, value, children }) => (
  <label className="vacancy-field"><span>{label}</span>{children || <input defaultValue={value} />}</label>
);

export default function CreateVacancyPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const selectedJob = jobs.find((job) => job.id === Number(jobId)) || jobs[0];
  const [activeTab, setActiveTab] = useState('details');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [endPeriod, setEndPeriod] = useState(selectedJob.endPeriod);
  const calendarDays = [null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [jobId]);

  useEffect(() => {
    setEndPeriod(selectedJob.endPeriod);
    setActiveTab('details');
  }, [selectedJob]);

  const stageCounts = {
    'New Applied': selectedJob.candidates.filter((candidate) => candidate.stage === 'New Applied').length,
    Screening: selectedJob.candidates.filter((candidate) => candidate.stage === 'Screening').length,
    Interview: selectedJob.candidates.filter((candidate) => candidate.stage === 'Interview').length,
    Tests: selectedJob.candidates.filter((candidate) => candidate.stage === 'Tests').length,
    Hired: selectedJob.candidates.filter((candidate) => candidate.stage === 'Hired').length,
  };

  const renderDescription = () => {
    const blocks = selectedJob.description.split('\n\n');

    return blocks.map((block, blockIndex) => {
      if (block.startsWith('Key Responsibilities:')) {
        const items = block
          .replace('Key Responsibilities:', '')
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean);

        return (
          <div key={`block-${blockIndex}`} className="description-list-wrap">
            <p className="description-heading">Key Responsibilities:</p>
            <ol className="description-list">
              {items.map((item, itemIndex) => (
                <li key={`item-${itemIndex}`}>{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          </div>
        );
      }

      return <p key={`block-${blockIndex}`} className="description-paragraph">{block}</p>;
    });
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <TopBar />
        <main className="page-content vacancy-page">
          <div className="vacancy-topbar">
            <button type="button" className="vacancy-back" onClick={() => navigate('/jobs')}><FiArrowLeft /> Back to Jobs</button>
            {activeTab === 'candidates' && (
              <button type="button" className="vacancy-next-job">Next Product Designer <span>›</span></button>
            )}
          </div>
          <section className="vacancy-container">
            {activeTab !== 'candidates' && (
              <header className="vacancy-header">
                <div className="vacancy-title-stack">
                  <div className="vacancy-title-row">
                    <h1>{selectedJob.title}</h1>
                  </div>
                  <p>{selectedJob.dateRange}</p>
                </div>
              </header>
            )}
            {activeTab === 'candidates' && (
              <header className="vacancy-header vacancy-header-candidates">
                <div className="vacancy-title-stack">
                  <div className="vacancy-title-row">
                    <h1>{selectedJob.title}</h1>
                    <span className="job-status-pill" style={{ backgroundColor: '#85C285', borderColor: '#85C285', color: '#fff' }}>
                      {selectedJob.status}
                    </span>
                  </div>
                  <p>{selectedJob.dateRange}</p>
                </div>
              </header>
            )}
            <div className="vacancy-tabs">
              <button type="button" className={activeTab === 'details' ? 'active' : ''} onClick={() => setActiveTab('details')}><span>Details</span><b>0</b></button>
              <button type="button" className={activeTab === 'candidates' ? 'active candidate-table-tab' : 'candidate-table-tab'} onClick={() => setActiveTab('candidates')}><span>Candidates</span><b>{selectedJob.candidates.length}</b></button>
              <button type="button" className={activeTab === 'activity' ? 'active' : ''} onClick={() => setActiveTab('activity')}><span>Activity</span><b>0</b></button>
            </div>

            {activeTab === 'details' && (
              <div className="vacancy-layout">
                <div className="vacancy-fields">
                  <Field label="Job Title" value={selectedJob.jobTitle} />
                  <Field label="End Period"><div className="date-picker-wrapper"><button type="button" className={`input-with-icon ${calendarOpen ? 'calendar-open' : ''}`} onClick={() => setCalendarOpen((isOpen) => !isOpen)}><span>{endPeriod}</span>{calendarOpen ? <FiChevronDown /> : <FiCalendar />}</button>{calendarOpen && <div className="vacancy-calendar"><header><strong>June 2023</strong><span>‹　›</span></header><div className="calendar-weekdays">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div><div className="calendar-days">{calendarDays.map((day, index) => day ? <button type="button" key={day} className={day === 18 ? 'selected' : ''} onClick={() => { setEndPeriod(`${String(day).padStart(2, '0')}/06/2023`); setCalendarOpen(false); }}>{day}</button> : <span key={`empty-${index}`} />)}</div></div>}</div></Field>
                  <Field label="Location" value={selectedJob.location} />
                  <Field label="Experience" value={selectedJob.experience} />
                  <Field label="Salary" value={selectedJob.salary} />
                  <Field label="Hiring Team" value={selectedJob.hiringTeam} />
                  <Field label="Job Type"><div className="choice-row"><label><input type="radio" defaultChecked name="job-type" /> {selectedJob.jobType}</label><label><input type="radio" name="job-type" /> On-site</label><label><input type="radio" name="job-type" /> Hybrid</label></div></Field>
                  <Field label="Job Tag"><div className="choice-row">{selectedJob.tags.map((tag) => <label key={tag}><input type="checkbox" defaultChecked /> {tag}</label>)}<label><input type="checkbox" /> Part-time</label></div></Field>
                </div>
                <div className="description-field">
                  <span>Job Description</span>
                  <div className="description-text-block">{renderDescription()}</div>
                </div>
              </div>
            )}

            {activeTab === 'candidates' && (
              <div className="job-candidates-panel">
                <div className="job-candidate-topline">
                  <div className="job-total-header">
                    <span>Total Candidates</span>
                    <b>{selectedJob.candidates.length}</b>
                  </div>
                </div>
                <div className="job-stage-row">
                  <span className="job-stage-pill stage-new">New Applied <b>{stageCounts['New Applied']}</b></span>
                  <span className="job-stage-pill stage-screening">Screening <b>{stageCounts.Screening}</b></span>
                  <span className="job-stage-pill stage-interview">Interview <b>{stageCounts.Interview}</b></span>
                  <span className="job-stage-pill stage-tests">Tests <b>{stageCounts.Tests}</b></span>
                  <span className="job-stage-pill stage-hired">Hired <b>{stageCounts.Hired}</b></span>
                </div>
                <div className="job-candidate-grid">
                  {selectedJob.candidates.map((candidate) => (
                    <button type="button" key={`${candidate.name}-${candidate.id}`} className="job-candidate-card" onClick={() => navigate(`/candidates/${candidate.id}/profile`)}>
                      <div className="job-candidate-top">
                        <img src={candidate.avatar} alt={candidate.name} />
                        <div className="job-candidate-user">
                          <strong>{candidate.name}</strong>
                          <div className="job-candidate-stars">{'★'.repeat(candidate.rating)}</div>
                        </div>
                      </div>
                      <div className="job-candidate-meta">{candidate.daysAgo}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="job-activity-panel">
                <p>No activity yet for this job.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
