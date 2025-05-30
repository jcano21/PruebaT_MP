import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/fiscalias', label: 'Fiscalías' },
    { to: '/estados-caso', label: 'Estados de Caso' },
    { to: '/usuarios', label: 'Usuarios' },
    { to: '/fiscales', label: 'Fiscales' },
    { to: '/casos', label: 'Casos' },
    { to: '/logs-reasignacion', label: 'Logs de Reasignación' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul>
        {links.map((link) => (
          <li key={link.to} className="mb-2">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block p-2 rounded ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;