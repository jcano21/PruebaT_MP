import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
  getCasos,
  createCaso,
  updateCaso,
  deleteCaso,
  asignarFiscalCaso,
  reasignarFiscalCaso,
  getFiscalias,
  getEstadosCaso,
  getFiscales,
} from '../services/api';

const Caso = () => {
  const [casos, setCasos] = useState([]);
  const [fiscalias, setFiscalias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [fiscales, setFiscales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    fetchCasos();
    fetchFiscalias();
    fetchEstados();
    fetchFiscales();
  }, []);

  const fetchCasos = async () => {
    try {
      const response = await getCasos();
      setCasos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFiscalias = async () => {
    try {
      const response = await getFiscalias();
      setFiscalias(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await getEstadosCaso();
      setEstados(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFiscales = async () => {
    try {
      const response = await getFiscales();
      setFiscales(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (caso) => {
    setModalData(caso);
    setIsModalOpen(true);
  };

  const handleDelete = async (caso) => {
    if (window.confirm('¿Está seguro de eliminar este caso?')) {
      try {
        await deleteCaso(caso.id_caso);
        fetchCasos();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAction = (caso, type) => {
    setModalData(caso);
    setActionType(type);
    setIsActionModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (modalData) {
        await updateCaso(modalData.id_caso, data);
      } else {
        await createCaso(data);
      }
      setIsModalOpen(false);
      fetchCasos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleActionSubmit = async (data) => {
    try {
      if (actionType === 'asignar') {
        await updateCaso(modalData.id_caso, data);
      } else if (actionType === 'reasignar') {
        await reasignarFiscalCaso(modalData.id_caso, data);
      }
      setIsActionModalOpen(false);
      fetchCasos();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: 'id_caso', label: 'ID' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'nombre_fiscal', label: 'Fiscal' },
    { key: 'nombre_estado', label: 'Estado' },
    { key: 'nombre_fiscalia', label: 'Fiscalía' },
  ];

  const formFields = [
    { name: 'descripcion', label: 'Descripción', type: 'text', required: true },
    {
      name: 'id_estado',
      label: 'Estado',
      type: 'select',
      required: true,
      options: estados.map((e) => ({ value: e.id_estado, label: e.nombre_estado })),
    },
    {
      name: 'id_fiscalia',
      label: 'Fiscalía',
      type: 'select',
      required: true,
      options: fiscalias.map((f) => ({ value: f.id_fiscalia, label: f.nombre })),
    },
    {
    name: 'id_fiscal',
    label: 'Fiscal Asignado',
    type: 'select',
    required: false,
    options: fiscales.map((f) => ({ value: f.id_fiscal, label: f.nombre })),
  },
  ];

  const actionFields = [
    {
      name: 'id_fiscal_nuevo',
      label: 'Fiscal',
      type: 'select',
      required: true,
      options: fiscales.map((f) => ({ value: f.id_fiscal, label: f.nombre })),
    },
  ];

  const renderActions = (row) => (
    <>
     
      <button
        onClick={() => handleAction(row, 'reasignar')}
        className="bg-yellow-500 text-white px-2 py-1 rounded"
      >
        Reasignar Fiscal
      </button>
    </>
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl">Gestión de Casos</h2>
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nuevo Caso
            </button>
          </div>
          <DataTable
            columns={columns}
            data={casos}
            onEdit={handleEdit}
            onDelete={handleDelete}
            renderActions={renderActions}
          />
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalData ? 'Editar Caso' : 'Nuevo Caso'}
            fields={formFields}
            onSubmit={handleSubmit}
            initialData={modalData}
          />
          <FormModal
            isOpen={isActionModalOpen}
            onClose={() => setIsActionModalOpen(false)}
            title={actionType === 'asignar' ? 'Asignar Fiscal' : 'Reasignar Fiscal'}
            fields={actionFields}
            onSubmit={handleActionSubmit}
            initialData={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Caso;