import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import '../styles/dashboard.css';
import '../styles/CreateVacancy.css';

const Field = ({ label, value, children }) => (
  <label className="vacancy-field"><span>{label}</span>{children || <input defaultValue={value} />}</label>
);

export default function CreateVacancyPage() {
  const navigate = useNavigate();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [endPeriod, setEndPeriod] = useState('18/08/2023');
  const calendarDays = [null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <TopBar />
        <main className="page-content vacancy-page">
          <div className="vacancy-back"><button type="button" onClick={() => navigate('/jobs')}><FiArrowLeft /> Back to Jobs</button></div>
          <section className="vacancy-container">
            <header className="vacancy-header"><div><h1>UX Designer</h1><p>06/07/-07/08/2023</p><div className="vacancy-meta"><span>Details</span><b>10</b><span>Candidates</span><b>0</b><span>Activity</span><b>0</b></div></div><button type="button" className="post-job-button">Post a Job</button></header>
            <div className="vacancy-layout">
              <div className="vacancy-fields">
                <Field label="Job Title" value="Junior UX Designer" />
                <Field label="End Period"><div className="date-picker-wrapper"><button type="button" className="input-with-icon" onClick={() => setCalendarOpen((isOpen) => !isOpen)}><span>{endPeriod}</span><FiCalendar /></button>{calendarOpen && <div className="vacancy-calendar"><header><strong>June 2023</strong><span>‹　›</span></header><div className="calendar-weekdays">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div><div className="calendar-days">{calendarDays.map((day, index) => day ? <button type="button" key={day} className={day === 18 ? 'selected' : ''} onClick={() => { setEndPeriod(`${String(day).padStart(2, '0')}/06/2023`); setCalendarOpen(false); }}>{day}</button> : <span key={`empty-${index}`} />)}</div></div>}</div></Field>
                <Field label="Location" value="Lagos" />
                <Field label="Experience" value="1-2 years" />
                <Field label="Salary" value="500K" />
                <Field label="Hiring Team" value="Ralph Edwards" />
                <Field label="Job Type"><div className="choice-row"><label><input type="radio" defaultChecked name="job-type" /> Remote</label><label><input type="radio" name="job-type" /> On-site</label><label><input type="radio" name="job-type" /> Hybrid</label></div></Field>
                <Field label="Job Tag"><div className="choice-row"><label><input type="checkbox" defaultChecked /> Full-time</label><label><input type="checkbox" defaultChecked /> Contract</label><label><input type="checkbox" /> Part-time</label></div></Field>
              </div>
              <label className="description-field"><span>Job Description</span><textarea defaultValue={'Position Overview:\nAs a Junior UX Designer, you will be responsible for assisting in the design and development of user experiences for various digital products and services. Working closely with senior designers and cross-functional teams, you will contribute to creating intuitive and engaging designs.'} /></label>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
