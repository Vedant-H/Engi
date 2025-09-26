import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Layout/Navbar';
import ToastProvider from './components/UI/Toast';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import ProjectReport from './pages/ProjectReport';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Mentor from './pages/Mentor';
import GitZen from './pages/GitZen';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mentor" element={<Mentor />} />
              <Route path="/project-report/:id" element={<ProjectReport />} />
              <Route path="/gitzen/:id" element={<GitZen />} />

            </Routes>
          </main>
          <ToastProvider />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;