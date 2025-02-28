import React from 'react';
import { useGetDashboardStatsQuery } from '../slices/dashboardApiSlice';
import Loader from '../components/Loader';

const DashboardScreen = () => {
  const { data, isLoading, error } = useGetDashboardStatsQuery();

  return (
    <>
      <h1 className="text-center" style={{ color: 'black' }}>
        Welcome Back, Arwind Kumarswamy!
      </h1>
      <h3 className="text-center">Here's a quick overview of your platform’s performance.</h3>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error loading dashboard data</div>
      ) : (
        <div className="dashboard-container">
          <div className="stats-grid">
            <div className="stat-box yellow">
              {data.activeUsers} <br /> Active Users
            </div>
            {/* <div className="stat-box pink">
              ₹{data.totalEarnings} <br /> Total Earnings
            </div> */}
            <div className="stat-box light-yellow">
              {data.pendingApprovals} <br /> Pending User Approvals
            </div>
          </div>
          <div className="stats-grid1">
            <div className="stat-box1 red">
              {data.totalApprovals} <br /> Total User Approved
            </div>
            {/* <div className="stat-box1 yellow">
              {data.platformEngagement} Users/week <br /> Platform Engagement
            </div> */}
            <div className="stat-box1 yellow">
              {data.HelmetAds}<br /> Total Helmet Ads
            </div>
            <div className="stat-box1 light-yellow">
              {data.AutowalaAds} <br /> Total Auto Ads
            </div>
            <div className="stat-box1 red">
              {data.WallAds} <br /> Total Wall Ads
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardScreen;
