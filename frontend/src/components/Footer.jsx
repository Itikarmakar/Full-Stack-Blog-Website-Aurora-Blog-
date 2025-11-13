import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">Aurora Blog</h2>
          <p className="max-w-md text-sm text-slate-400">
            A community for curious minds. Share immersive stories, spark meaningful conversations,
            and discover perspectives from creators around the world.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-300">
          <Link to="/" className="transition hover:text-indigo-300">
            Home
          </Link>
          <Link to="/home" className="transition hover:text-indigo-300">
            Dashboard
          </Link>
          <Link to="/posts" className="transition hover:text-indigo-300">
            All Posts
          </Link>
          <Link to="/add-post" className="transition hover:text-indigo-300">
            Create
          </Link>
          <Link to="/login" className="transition hover:text-indigo-300">
            Login
          </Link>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Aurora Blog. Crafted for storytellers.</p>
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-indigo-300"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-indigo-300"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@aurorablog.com"
              className="transition hover:text-indigo-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

