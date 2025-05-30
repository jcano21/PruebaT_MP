import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/api';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

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

  const handleEdit = (usuario) => {
    setModalData(usuario);
    setIsModalOpen(true);
  };

  const handleDelete = async (usuario) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        await deleteUsuario(usuario.id_usuario);
        fetchUsuarios();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modalData) {
        await updateUsuario(modalData.id_usuario, data);
      } else {
        await createUsuario(data);
      }
      setIsModalOpen(false);
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { key: 'id_usuario', label: 'ID' },
    { key: 'nombre_usuario', label: 'Usuario' },
    { key: 'rol', label: 'Rol' },
    { key: 'email', label: 'Email' },
  ];

  const fields = [
    { name: 'nombre_usuario', label: 'Nombre de Usuario', type: 'text', required: true },
    { name: 'contrasena', label: 'Contraseña', type: 'password', required: !modalData },
    { name: 'rol', label: 'Rol', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl">Gestión de Usuarios</h2>
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Nuevo Usuario
            </button>
          </div>
          <DataTable
            columns={columns}
            data={usuarios}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={modalData ? 'Editar Usuario' : 'Nuevo Usuario'}
            fields={fields}
            onSubmit={handleSubmit}
            initialData={modalData}
          />
        </div>
      </div>
    </div>
  );
};

export default Usuario;