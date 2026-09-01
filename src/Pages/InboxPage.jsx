import Sidebar from '../Components/adminConponents/Sidebar';
import TopBar from '../Components/adminConponents/Topbar';
import '../styles/inbox.css';

export default function InboxPage() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <TopBar />
        <main className="page-content inbox-page">
          <section className="inbox-coming-soon">
            <img
              src="/images/coming soon.svg"
              alt="Coming soon illustration"
              className="inbox-illustration"
            />
            <h1>Inbox</h1>
            <p>We’re building your messages and notifications experience.</p>
            <button type="button" onClick={() => window.history.back()}>
              Go Back
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
