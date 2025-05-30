import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getEstadosCaso, createEstadoCaso, updateEstadoCaso, deleteEstadoCaso } from '../services/api';

const EstadoCaso = () => {
  const [estados, setEstados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchEstados();
  }, []);

  const fetchEstados = async () => {
    try {
      const response = await getEstadosCaso();
      setEstados(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (estado) => {
    setModalData(estado);
    setIsModalOpen(true);
  };

  const handleDelete = async (estado) => {
    if (window.confirm('¿Está seguro de eliminar este estado?')) {
      try {
        await deleteEstadoCaso(estado.id_estado);
        fetchEstados();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modalData) {
        await updateEstadoCaso(modalData.id_estado, data);
      } else {
        await createEstadoCaso(data);
      }
      setIsModalOpen(false);
      fetchEstados();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: 'id_estado', label: 'ID' },
    { key: 'nombre_estado', label: 'Nombre' },
  ];

  const fields = [
    { name: 'nombre_estado', label: 'Nombre del Estado', type: 'text', required: true },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl">Gestión de Estados de Caso</h2>
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nuevo Estado
            </button>
          </div>
          <DataTable
            columns={columns}
            data={estados}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalData ? 'Editar Estado' : 'Nuevo Estado'}
            fields={fields}
            onSubmit={handleSubmit}
            initialData={modalData}
          />
        </div>
      </div>
    </div>
  );
};

export default EstadoCaso;