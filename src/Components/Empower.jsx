import { useState } from 'react';

const tabs = [
  {
    id: 'screening',
    label: 'Screening',
    icon: 'images/Deal.svg',
    image: 'images/Frame 18.png',
    title: 'Candidate screening and evaluation',
    content: 'Hr are able to screen and evaluate job candidates objectively, using data-driven tools that help me identify the best candidates for the job, so that they can streamline the hiring process and make informed decisions about the hiring strategy.',
    reverse: false
  },
  {
    id: 'jobposting',
    label: 'Job Posting',
    icon: 'images/Job letter.svg',
    image: 'images/employee-referral02-background.svg.png',
    title: 'Job posting and management',
    content: 'Hr are able to screen and evaluate job candidates objectively, using data-driven tools that help me identify the best candidates for the job, so that they can streamline the hiring process and make informed decisions about the hiring strategy.',
    reverse: false
  },
  {
    id: 'interviews',
    label: 'Interviews',
    icon: 'images/facebook jobs.svg',
    image: 'images/value-option17.jpg.png',
    title: 'Interview scheduling and management',
    content: 'As a hiring manager, HRme is able to schedule and manage interviews with job candidates efficiently, so that you can keep the hiring process moving forward and ensure that all candidates are evaluated fairly.',
    reverse: true
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    icon: 'images/deal.svg',
    image: 'images/Frame 427319971 2.png',
    title: 'Data-driven hiring insights and analytics',
    content: 'As a hiring manager, HRme is able to schedule and manage interviews with job candidates efficiently, so that you can keep the hiring process moving forward and ensure that all candidates are evaluated fairly.',
    reverse: false
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'images/Google analytics (1).svg',
    image: 'images/value-option17.jpg (1).png',
    title: 'Onboarding tools and resources',
    content: 'Provide new hires with the tools and resources they need to succeed, so that they can onboard quickly and become productive members of the team as soon as possible.',
    reverse: true
  },
];

export default function Empower() {
  const [activeTab, setActiveTab] = useState('screening');

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="empower">
      <h2>Empower Employees and Automate HR Screeening</h2>

      <div className="tab-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            data-tab={tab.id}
          >
            <img src={tab.icon} alt="" className="tab-icon" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-panels">
        {activeTabData && (
          <div className={`panel active ${activeTabData.reverse ? 'reverse' : ''}`}>
            <img 
              src={activeTabData.image} 
              alt={activeTabData.title} 
              className="panel-img" 
            />
            <div className="panel-info">
              <h3>{activeTabData.title}</h3>
              <p>{activeTabData.content}</p>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}