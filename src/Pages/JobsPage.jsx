import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiFilter, FiPlus, FiMoreVertical, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import '../styles/dashboard.css';
import '../styles/Jobs.css';

const JOBS = [
  { id: 1, position: 'Product Designer', status: 'Published', statusColor: '#16a34a', recruiter: 'Albert Flores', avatar: 'https://i.pravatar.cc/100?img=12', type: 'Product Designer' },
  { id: 2, position: 'Accountant', status: 'On Hold', statusColor: '#f59e0b', recruiter: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/100?img=32', type: 'Accountant' },
  { id: 3, position: 'Ui Designer', status: 'Published', statusColor: '#16a34a', recruiter: 'Ralph Edwards', avatar: 'https://i.pravatar.cc/100?img=47', type: 'Ui Designer' },
  { id: 4, position: 'Product Designer', status: 'Published', statusColor: '#16a34a', recruiter: 'Albert Flores', avatar: 'https://i.pravatar.cc/100?img=12', type: 'Product Designer' },
  { id: 5, position: 'Accountant', status: 'On Hold', statusColor: '#f59e0b', recruiter: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/100?img=32', type: 'Accountant' },
  { id: 6, position: 'Ui Designer', status: 'Published', statusColor: '#16a34a', recruiter: 'Ralph Edwards', avatar: 'https://i.pravatar.cc/100?img=47', type: 'Ui Designer' },
  { id: 7, position: 'Product Designer', status: 'Published', statusColor: '#16a34a', recruiter: 'Albert Flores', avatar: 'https://i.pravatar.cc/100?img=12', type: 'Product Designer' },
  { id: 8, position: 'Accountant', status: 'On Hold', statusColor: '#f59e0b', recruiter: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/100?img=32', type: 'Accountant' },
  { id: 9, position: 'Ui Designer', status: 'Published', statusColor: '#16a34a', recruiter: 'Ralph Edwards', avatar: 'https://i.pravatar.cc/100?img=47', type: 'Ui Designer' },
  { id: 10, position: 'Product Designer', status: 'Published', statusColor: '#16a34a', recruiter: 'Albert Flores', avatar: 'https://i.pravatar.cc/100?img=12', type: 'Product Designer' },
];

export default function JobsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(null);
  const pageCount = 5;
  const visibleJobs = activeTab === 'archived' ? [] : JOBS;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <TopBar />
        <main className="page-content jobs-page">
          <section className="jobs-container">
            <header className="jobs-header">
              <h1>Jobs</h1>
              <div className="jobs-actions">
                <button type="button" className="jobs-outline-button"><FiDownload /> Export</button>
                <button type="button" className="jobs-outline-button"><FiFilter /> Filters</button>
                <button type="button" className="create-vacancy" onClick={() => navigate('/jobs/create')}><FiPlus /> Create Vacancy</button>
              </div>
            </header>
            <div className="jobs-tabs">
              <button type="button" className={activeTab === 'all' ? 'active' : ''} onClick={() => { setActiveTab('all'); setPage(1); }}>All Jobs <b>10</b></button>
              <button type="button" className={activeTab === 'archived' ? 'active' : ''} onClick={() => { setActiveTab('archived'); setPage(1); }}>Archived <b>0</b></button>
            </div>
            <div className="jobs-table-wrap">
              <table className="jobs-table">
                <thead><tr><th><input type="checkbox" aria-label="Select all jobs" /></th><th>Position</th><th>Candidates</th><th>Date</th><th>Status</th><th>Recruiter</th><th>Published</th><th></th></tr></thead>
                <tbody>{visibleJobs.map((job) => <tr key={job.id} onClick={() => navigate(`/jobs/${job.id}`)} className="job-row-clickable">
                  <td><input type="checkbox" aria-label={`Select ${job.position}`} /></td>
                  <td>{job.position}</td><td>356</td><td>06/07/-07/08/2023</td>
                  <td><span className="job-status"><i style={{ backgroundColor: job.statusColor }} />{job.status}</span></td>
                  <td><div className="recruiter-cell"><img src={job.avatar} alt="" /><span>{job.recruiter}</span></div></td>
                  <td><div className="published-channels"><span>in</span><span>f</span><span>ln</span></div></td>
                  <td><button type="button" className="job-menu-button" onClick={(event) => { event.stopPropagation(); setMenuOpen(menuOpen === job.id ? null : job.id); }} aria-label={`Actions for ${job.position}`}><FiMoreVertical /></button>{menuOpen === job.id && <div className="job-row-menu"><button type="button">Edit Job</button><button type="button">Archive Job</button><button type="button">Delete Job</button></div>}</td>
                </tr>)}</tbody>
              </table>
            </div>
            <footer className="jobs-pagination"><div>Showing <select defaultValue="10"><option>10</option><option>20</option><option>50</option></select> of 50</div><div className="jobs-page-controls"><button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}><FiChevronLeft /></button><button type="button" className="selected">{page}</button><button type="button" onClick={() => setPage(Math.min(pageCount, page + 1))}><FiChevronRight /></button></div></footer>
          </section>
        </main>
      </div>
    </div>
  );
}
