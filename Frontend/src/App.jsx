import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Fiscalia from './pages/Fiscalia';
import EstadoCaso from './pages/EstadoCaso';
import Usuario from './pages/Usuario';
import Fiscal from './pages/Fiscal';
import Caso from './pages/Caso';
import LogReasignacion from './pages/LogReasignacion';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fiscalias"
          element={
            <ProtectedRoute>
              <Fiscalia />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estados-caso"
          element={
            <ProtectedRoute>
              <EstadoCaso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fiscales"
          element={
            <ProtectedRoute>
              <Fiscal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/casos"
          element={
            <ProtectedRoute>
              <Caso />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs-reasignacion"
          element={
            <ProtectedRoute>
              <LogReasignacion />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;