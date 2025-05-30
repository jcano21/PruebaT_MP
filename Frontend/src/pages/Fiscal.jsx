import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getFiscales, createFiscal, updateFiscal, deleteFiscal, getFiscalias, getUsuarios } from '../services/api';

const Fiscal = () => {
  const [fiscales, setFiscales] = useState([]);
  const [fiscalias, setFiscalias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchFiscales();
    fetchFiscalias();
    fetchUsuarios();
  }, []);

  const fetchFiscales = async () => {
    try {
      const response = await getFiscales();
      setFiscales(response.data);
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

  const fetchUsuarios = async () => {
    try {
      const response = await getUsuarios();
      setUsuarios(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = () => {
    setModalData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (fiscal) => {
    setModalData(fiscal);
    setIsModalOpen(true);
  };

  const handleDelete = async (fiscal) => {
    if (window.confirm('¿Está seguro de eliminar este fiscal?')) {
      try {
        await deleteFiscal(fiscal.id_fiscal);
        fetchFiscales();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modalData) {
        await updateFiscal(modalData.id_fiscal, data);
      } else {
        await createFiscal(data);
      }
      setIsModalOpen(false);
      fetchFiscales();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: 'id_fiscal', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'nombre_fiscalia', label: 'Fiscalía' },
  ];

  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    {
      name: 'id_fiscalia',
      label: 'Fiscalía',
      type: 'select',
      required: true,
      options: fiscalias.map((f) => ({ value: f.id_fiscalia, label: f.nombre })),
    },
    {
      name: 'id_usuario',
      label: 'Usuario',
      type: 'select',
      required: true,
      options: usuarios.map((u) => ({ value: u.id_usuario, label: u.nombre_usuario })),
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl">Gestión de Fiscales</h2>
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nuevo Fiscal
            </button>
          </div>
          <DataTable
            columns={columns}
            data={fiscales}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalData ? 'Editar Fiscal' : 'Nuevo Fiscal'}
            fields={fields}
            onSubmit={handleSubmit}
            initialData={modalData}
          />
        </div>
      </div>
    </div>
  );
};

export default Fiscal;