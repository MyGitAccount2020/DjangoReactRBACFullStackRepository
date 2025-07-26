import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Sample medical data
  const medicalHistory = [
    { date: '2023-10-15', diagnosis: 'Annual Checkup', doctor: 'Dr. Smith' },
    { date: '2023-07-22', diagnosis: 'Flu Treatment', doctor: 'Dr. Johnson' },
    { date: '2023-03-10', diagnosis: 'Blood Test', doctor: 'Dr. Williams' },
  ];

  const upcomingAppointments = [
    { date: '2023-11-20', time: '10:30 AM', doctor: 'Dr. Smith', purpose: 'Follow-up' },
    { date: '2023-12-05', time: '02:15 PM', doctor: 'Dr. Patel', purpose: 'Consultation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Patient Portal</h1>
            <p className="text-blue-100">Welcome back!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200 cursor-pointer">
            <h3 className="font-semibold text-gray-800 mb-2">Book Appointment</h3>
            <p className="text-gray-600 text-sm">Schedule with your doctor</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200 cursor-pointer">
            <h3 className="font-semibold text-gray-800 mb-2">View Prescriptions</h3>
            <p className="text-gray-600 text-sm">Access your medications</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200 cursor-pointer">
            <h3 className="font-semibold text-gray-800 mb-2">Medical Records</h3>
            <p className="text-gray-600 text-sm">Your complete health history</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition duration-150">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.doctor}</h3>
                    <p className="text-sm text-gray-500">{appointment.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                  </div>
                </div>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <div className="px-6 py-4 text-center text-gray-500">
                No upcoming appointments
              </div>
            )}
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Medical History</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {medicalHistory.map((record, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition duration-150">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{record.diagnosis}</h3>
                    <p className="text-sm text-gray-500">With {record.doctor}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {record.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Need help? Contact support at support@hospital.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;