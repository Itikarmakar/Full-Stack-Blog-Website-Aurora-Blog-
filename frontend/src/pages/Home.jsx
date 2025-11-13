import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import toast from 'react-hot-toast';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen page-section">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-slate-300">
            <span className="h-12 w-12 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Loading posts…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-section">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 flex flex-col gap-4 text-left">
          <span className="badge-soft w-fit">Curated for you</span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Welcome back, {user?.username}
          </h1>
          <p className="max-w-2xl text-base text-slate-300">
            Dive into the latest thoughts from our global community. Discover fresh perspectives,
            immersive storytelling, and actionable insights tailored for curious minds.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-semibold text-white">No posts yet</h2>
            <p className="mt-3 text-sm text-slate-300">
              Be the first to craft a story that inspires the community.
            </p>
            <Link to="/add-post" className="btn-primary mt-6 inline-flex px-8 py-3">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

