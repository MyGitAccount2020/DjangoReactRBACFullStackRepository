import React from 'react';

const DoctorDashboard = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Welcome, Doctor! You can view patient records and manage appointments here.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DoctorDashboard;
