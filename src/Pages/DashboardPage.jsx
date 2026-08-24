import React from 'react';
import Sidebar from "../Components/adminConponents/Sidebar";
import TopBar from "../Components/adminConponents/Topbar"; 
import StatsCards from"../Components/adminConponents/StatsCards"; 
import DashboardMetrics from"../Components/adminConponents/DashboardMetrics"; 
import CandidatesTable from"../Components/adminConponents/CandidatesTable"; 
import "../Styles/dashboard.css";

const DashboardPage = () => {
  return (
    <div className="dash">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main dashboard content area */}
      <main className="main">
        {/* Top Header */}
        <TopBar username="Joy" />
       
       <StatsCards/>
       <DashboardMetrics/>
       <CandidatesTable/>

      </main>
    </div>
  );
};

export default DashboardPage;