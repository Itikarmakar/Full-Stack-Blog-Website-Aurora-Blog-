import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden page-section pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-64 w-64 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-500/20 blur-[140px]" />
      </div>
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 text-center">
        <span className="badge-soft">Modern Blogging Platform</span>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-snug">
          Share stories that inspire with
          <span className="block pt-4 pb-4 text-5xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text sm:text-6xl lg:text-7xl">
            Aurora&nbsp;Blog
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Discover thoughtful perspectives from creators worldwide. Join our vibrant community to publish immersive stories, engage with readers, and grow your voice.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/signup" className="btn-primary px-10 py-3 text-base">
            Get Started Free
          </Link>
          <Link to="/login" className="btn-secondary px-10 py-3 text-base">
            Login to Continue
          </Link>
        </div>
        <div className="mt-20 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Curated Insights',
              description: 'Hand-picked articles from passionate writers, refreshed daily to keep you inspired.',
            },
            {
              title: 'Rich Storytelling',
              description: 'Craft beautiful posts with our TinyMCE editor and eye-catching cover imagery.',
            },
            {
              title: 'Secure & Personal',
              description: 'Protected routes, author-only controls, and secure auth keep your content safe.',
            },
          ].map((feature) => (
            <div key={feature.title} className="glass-panel rounded-2xl p-6 text-left">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

