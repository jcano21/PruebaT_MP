import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl mb-4">Bienvenido al Sistema del Ministerio Público</h2>
          <p>Seleccione una opción del menú lateral para gestionar las entidades.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;