import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getFiscalias, createFiscalia, updateFiscalia, deleteFiscalia } from '../services/api';

const Fiscalia = () => {
  const [fiscalias, setFiscalias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchFiscalias();
  }, []);

  const fetchFiscalias = async () => {
    try {
      const response = await getFiscalias();
      setFiscalias(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (fiscalia) => {
    setModalData(fiscalia);
    setIsModalOpen(true);
  };

  const handleDelete = async (fiscalia) => {
    if (window.confirm('¿Está seguro de eliminar esta fiscalía?')) {
      try {
        await deleteFiscalia(fiscalia.id_fiscalia);
        fetchFiscalias();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modalData) {
        await updateFiscalia(modalData.id_fiscalia, data);
      } else {
        await createFiscalia(data);
      }
      setIsModalOpen(false);
      fetchFiscalias();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: 'id_fiscalia', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'ubicacion', label: 'Ubicación' },
  ];

  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'ubicacion', label: 'Ubicación', type: 'text', required: true },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl">Gestión de Fiscalías</h2>
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nueva Fiscalía
            </button>
          </div>
          <DataTable
            columns={columns}
            data={fiscalias}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalData ? 'Editar Fiscalía' : 'Nueva Fiscalía'}
            fields={fields}
            onSubmit={handleSubmit}
            initialData={modalData}
          />
        </div>
      </div>
    </div>
  );
};

export default Fiscalia;