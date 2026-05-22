import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

const TopAppBar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-6 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
      <nav className="hidden lg:flex gap-8">
        <Link
          to="/"
          className="font-serif uppercase tracking-widest text-xs text-stone-400 hover:text-stone-600 transition-opacity"
        >
          Perfumes
        </Link>
        <Link
          to="/"
          className="font-serif uppercase tracking-widest text-xs text-stone-400 hover:text-stone-600 transition-opacity"
        >
          Houses
        </Link>
        <Link
          to="/"
          className="font-serif uppercase tracking-widest text-xs text-stone-400 hover:text-stone-600 transition-opacity"
        >
          Olfactory Stories
        </Link>
        <Link
          to="/"
          className="font-serif uppercase tracking-widest text-xs text-stone-400 hover:text-stone-600 transition-opacity"
        >
          Boutique
        </Link>
      </nav>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link
          to="/"
          className="text-2xl font-serif tracking-[0.3em] text-stone-900"
        >
          L'ESSENCE
        </Link>
      </div>
      <div className="flex items-center gap-6 text-stone-900">
        <button className="hover:opacity-70 transition-transform active:scale-95">
          <span className="material-symbols-outlined">search</span>
        </button>
        {user?.role === 'admin' ? (
          <Link
            to="/admin"
            className="hover:opacity-70 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>
          </Link>
        ) : null}
        {user?.role === 'vendor' ? (
          <Link
            to="/vendor"
            className="hover:opacity-70 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">dashboard</span>
          </Link>
        ) : null}
        {user ? (
          <Link
            to="/orders"
            className="hover:opacity-70 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">receipt_long</span>
          </Link>
        ) : null}
        <Link
          to="/checkout"
          className="hover:opacity-70 transition-transform active:scale-95 border-b border-stone-900 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          {itemCount > 0 ? (
            <span className="text-xs font-semibold">{itemCount}</span>
          ) : null}
        </Link>
        {user ? (
          <button
            type="button"
            onClick={logout}
            className="hover:opacity-70 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="hover:opacity-70 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopAppBar;
