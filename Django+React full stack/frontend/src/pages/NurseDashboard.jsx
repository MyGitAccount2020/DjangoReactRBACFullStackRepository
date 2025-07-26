import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserGroupIcon,
  CalendarIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
const ClipboardDocumentIcon = () => <span>📋</span>;
const NurseDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Sample patient data
  const patients = [
    { id: 1, name: 'Sarah Johnson', room: '302', status: 'Post-op' },
    { id: 2, name: 'Michael Chen', room: '415', status: 'Recovery' },
    { id: 3, name: 'Emma Williams', room: '201', status: 'Pre-op' }
  ];

  const vitalStats = [
    { name: 'Heart Rate', value: '72 bpm', trend: 'stable' },
    { name: 'Blood Pressure', value: '120/80', trend: 'normal' },
    { name: 'Temperature', value: '98.6°F', trend: 'normal' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-700 text-white">
        <div className="p-4 flex items-center space-x-3 border-b border-blue-600">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <UserGroupIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="font-medium">Nurse Portal</p>
            <p className="text-xs text-blue-200">General Hospital</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-2 rounded bg-blue-600">
            <ClipboardDocumentIcon className="w-5 h-5" />
            <span>Patient Records</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600">
            <UserGroupIcon className="w-5 h-5" />
            <span>My Patients</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600">
            <CalendarIcon className="w-5 h-5" />
            <span>Schedule</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600">
            <BellIcon className="w-5 h-5" />
            <span>Alerts</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Nurse Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {vitalStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                stat.trend === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {stat.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">My Patients</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {patients.map(patient => (
              <div key={patient.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <p className="text-sm text-gray-500">Room {patient.room}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  patient.status === 'Post-op' ? 'bg-purple-100 text-purple-800' :
                  patient.status === 'Recovery' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
            Record Vital Signs
          </button>
          <button className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium">
            Request Doctor Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;