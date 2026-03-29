import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Analyze from './pages/Analyze';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-ice font-inter text-slate-900">
          <Routes>
            <Route path="/" element={<Navigate to="/analyze" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/analyze" element={<Analyze />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
