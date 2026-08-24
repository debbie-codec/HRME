import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";


// HELPER: Transform raw API/Database metrics into Stats Card data format

export function generatePageStats(data = {}) {
  const {
    openingsCount = 0,
    applicationsCount = 0,
    qualifiedCount = 0,
    rejectedCount = 0,
  } = data;

  return [
    {
      id: "openings",
      title: "Job Openings",
      value: openingsCount,
      trend: "12.0%",
      percentage: 60,
      color: "#0a3880",
      trackColor: "#dbeafe",
      badgeBg: "#e0e7ff",
      badgeColor: "#1d4ed8",
      isPositive: true,
    },
    {
      id: "applications",
      title: "Total Applications",
      value: applicationsCount,
      trend: "10.0%",
      percentage: Math.min(Math.round((applicationsCount / 10000) * 100), 100),
      color: "#00a82d",
      trackColor: "#dcfce7",
      badgeBg: "#dcfce7",
      badgeColor: "#15803d",
      isPositive: true,
    },
    {
      id: "qualified",
      title: "Qualified Candidates",
      value: qualifiedCount,
      trend: "22.0%",
      percentage: Math.min(
        Math.round((qualifiedCount / (applicationsCount || 1)) * 100),
        100
      ),
      color: "#f59e0b",
      trackColor: "#fef3c7",
      badgeBg: "#fef3c7",
      badgeColor: "#b45309",
      isPositive: true,
    },
    {
      id: "rejected",
      title: "Rejected Candidates",
      value: rejectedCount,
      trend: "7.0%",
      percentage: Math.min(
        Math.round((rejectedCount / (applicationsCount || 1)) * 100),
        100
      ),
      color: "#ef4444",
      trackColor: "#fee2e2",
      badgeBg: "#ffe4e6",
      badgeColor: "#be123c",
      isPositive: false,
    },
  ];
}

// Default static fallback data
const DEFAULT_STATS = [
  {
    id: 1,
    title: "Job Openings",
    value: 15,
    trend: "12.0%",
    percentage: 60,
    color: "#0a3880",
    trackColor: "#dbeafe",
    badgeBg: "#e0e7ff",
    badgeColor: "#1d4ed8",
    isPositive: true,
  },
  {
    id: 2,
    title: "Total Applications",
    value: 6537,
    trend: "10.0%",
    percentage: 60,
    color: "#00a82d",
    trackColor: "#dcfce7",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    isPositive: true,
  },
  {
    id: 3,
    title: "Qualified Candidates",
    value: 4215,
    trend: "22.0%",
    percentage: 60,
    color: "#f59e0b",
    trackColor: "#fef3c7",
    badgeBg: "#fef3c7",
    badgeColor: "#b45309",
    isPositive: true,
  },
  {
    id: 4,
    title: "Rejected Candidates",
    value: 2322,
    trend: "7.0%",
    percentage: 60,
    color: "#ef4444",
    trackColor: "#fee2e2",
    badgeBg: "#ffe4e6",
    badgeColor: "#be123c",
    isPositive: false,
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Stats({ stats, rawData, isLoading = false }) {
  const radius = 32;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;

  // Resolve active stats data
  let displayStats = DEFAULT_STATS;
  if (Array.isArray(stats) && stats.length > 0) {
    displayStats = stats;
  } else if (rawData && typeof rawData === "object") {
    displayStats = generatePageStats(rawData);
  }

  if (isLoading) {
    return (
      <div className="stats-container">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="stat-card skeleton-card">
            <div className="stat-info">
              <div className="skeleton-line title-skeleton"></div>
              <div className="skeleton-line value-skeleton"></div>
              <div className="skeleton-line badge-skeleton"></div>
            </div>
            <div className="skeleton-circle"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-container">
      {displayStats.map((stat) => {
        const percentage = Math.min(
          Math.max(stat.percentage || 0, 0),
          100
        );
        const strokeDashoffset =
          circumference - (percentage / 100) * circumference;
        const isPositive = stat.isPositive ?? true;

        return (
          <div key={stat.id || stat.title} className="stat-card">
            {/* LEFT STAT INFO */}
            <div className="stat-info">
              <span className="stat-title">{stat.title}</span>
              <h2 className="stat-value">
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </h2>

              {/* TREND BADGE */}
              <div
                className="stat-badge"
                style={{
                  backgroundColor:
                    stat.badgeBg ||
                    (isPositive ? "#dcfce7" : "#ffe4e6"),
                  color:
                    stat.badgeColor ||
                    (isPositive ? "#15803d" : "#be123c"),
                }}
              >
                {isPositive ? (
                  <FiTrendingUp className="trend-icon" />
                ) : (
                  <FiTrendingDown className="trend-icon" />
                )}
                <span>{stat.trend}</span>
              </div>
            </div>

            {/* CIRCULAR PROGRESS RING */}
            <div className="stat-chart">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={stat.trackColor || "#e5e7eb"}
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={stat.color || "#2563eb"}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <span className="chart-label">+{percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}