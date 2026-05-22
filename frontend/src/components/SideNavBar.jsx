import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SideNavBar = ({ active }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.name || 'Account';
  const displayRole = user?.role ? String(user.role).toUpperCase() : 'PORTAL';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed left-0 top-0 h-screen flex flex-col p-6 w-64 border-r border-stone-200 bg-stone-50 transition-all duration-200 ease-in-out z-40">
      <div className="flex items-center gap-4 mb-stack-lg">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant flex-shrink-0">
          <img
            alt="Admin Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_FlNGHt9rItvj0pDItkcadw3gKRiiJAf-wULefuu6W73tfFEEo_RcZ40xCaOcs9IwiAlaef6O0iSTgifPovw6Rq4vsbXpTM5ALA3F_tM6dxHOtImJfHBWbEmfXBRRgnXDSdnjBHqIItwp7Mz2wkb4o-9HqpF79tD9BZRTQNOhrasjMzWuHKfSU9mfpdgiwdW28Jt6RtX8cVPAqdNP0cMQzFLY5h1HuZar17U-tLdgpqOUnmGhWj4vqCkPUVfSt5B9RR81aM6w0mxs"
          />
        </div>
        <div>
          <h1 className="font-headline-md text-[18px] text-stone-900 tracking-tight leading-none">
            {displayName}
          </h1>
          <p className="font-label-caps text-[10px] text-stone-500 uppercase mt-1">
            {displayRole} PORTAL
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-2 flex-grow">
        <li>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-DEFAULT text-stone-500 hover:bg-stone-100 transition-colors"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-body-md text-body-md">Storefront</span>
          </Link>
        </li>
        <li>
          <Link
            to="/vendor"
            className={`flex items-center gap-3 px-4 py-3 rounded-DEFAULT transition-colors ${
              active === 'vendor'
                ? 'bg-stone-100 text-stone-900 font-medium'
                : 'text-stone-500 hover:bg-stone-100'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </Link>
        </li>
        {user?.role === 'admin' ? (
          <li>
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-DEFAULT transition-colors ${
                active === 'admin'
                  ? 'bg-stone-100 text-stone-900 font-medium'
                  : 'text-stone-500 hover:bg-stone-100'
              }`}
            >
              <span className="material-symbols-outlined">verified_user</span>
              <span className="font-body-md text-body-md">Vendor Admin</span>
            </Link>
          </li>
        ) : null}
        <li className="mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-DEFAULT text-stone-500 hover:bg-stone-100 transition-colors border-t border-stone-200 pt-4"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-body-md text-body-md">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
