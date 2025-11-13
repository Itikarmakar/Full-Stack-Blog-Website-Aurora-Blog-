import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  const NavLinks = ({ variant = 'desktop' }) => {
    const linkClass =
      variant === 'desktop'
        ? 'btn-secondary'
        : 'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10';
    const primaryClass =
      variant === 'desktop'
        ? 'btn-primary'
        : 'w-full rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400';

    if (user) {
      return (
        <>
          <Link to="/home" className={linkClass} onClick={closeMobile}>
            Dashboard
          </Link>
          <Link to="/posts" className={linkClass} onClick={closeMobile}>
            All Posts
          </Link>
          <Link to="/add-post" className={primaryClass} onClick={closeMobile}>
            Create
          </Link>
          <button
            onClick={handleLogout}
            className={variant === 'desktop' ? 'btn-secondary' : linkClass}
            type="button"
          >
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link to="/" className={linkClass} onClick={closeMobile}>
          Home
        </Link>
        <Link to="/login" className={linkClass} onClick={closeMobile}>
          Login
        </Link>
        <Link to="/signup" className={primaryClass} onClick={closeMobile}>
          Create Account
        </Link>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-100"
          onClick={closeMobile}
        >
          <span className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-1 text-sm font-bold uppercase text-white shadow-lg shadow-indigo-500/40">
            Aurora
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-xl">Aurora Blog</span>
            <span className="text-xs font-normal text-slate-400">
              Share stories. Inspire minds.
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
              {user.username?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Open navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {user && (
            <div className="items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 shadow-md shadow-indigo-500/10 backdrop-blur md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
                {user.username?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex flex-col leading-tight">
                <span>{user.username}</span>
                <span className="text-xs text-slate-400">Creative author</span>
              </div>
            </div>
          )}
          <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
            <NavLinks />
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 pb-6 pt-4 md:hidden">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 shadow-md shadow-indigo-500/10">
            {user ? (
              <>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-base font-semibold text-white">
                  {user.username?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span>{user.username}</span>
                  <span className="text-xs text-slate-400">Creative author</span>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400">Explore the latest stories from Aurora Blog.</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <NavLinks variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

