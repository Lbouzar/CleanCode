import './App.css'
import React from 'react';
import IncidentReportForm from './IncidentReportForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">VoltRide - Gestion des essais</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <IncidentReportForm />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© 2025 VoltRide - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default App;