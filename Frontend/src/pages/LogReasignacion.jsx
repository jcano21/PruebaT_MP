import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getLogsReasignacion } from '../services/api';

const LogReasignacion = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await getLogsReasignacion();
      setLogs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: 'id_log', label: 'ID' },
    { key: 'id_caso', label: 'Caso ID' },
    { key: 'nombre_fiscal_anterior', label: 'Fiscal Anterior' },
    { key: 'nombre_fiscal_nuevo', label: 'Fiscal Nuevo' },
    { key: 'fecha_intento', label: 'Fecha' },
    { key: 'motivo', label: 'Motivo' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl mb-4">Logs de Reasignación</h2>
          <DataTable
            columns={columns}
            data={logs}
            onEdit={null}
            onDelete={null}
          />
        </div>
      </div>
    </div>
  );
};

export default LogReasignacion;