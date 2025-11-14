import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/getImageUrl';

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      toast.error('Failed to fetch post');
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeleting(true);
    try {
      await api.delete(`/posts/${id}`);
      toast.success('Post deleted successfully');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const isAuthor = user && post.authorId.toString() === user._id.toString();

  return (
    <div className="min-h-screen page-section">
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="badge-soft">Immersive storytelling</span>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                <span className="font-semibold text-indigo-200">{post.author}</span>
              </div>
              <span className="text-slate-400">
                Published {new Date(post.createdAt).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
          {isAuthor && (
            <div className="flex items-center gap-3">
              <Link to={`/edit-post/${id}`} className="btn-primary px-5 py-2">
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn-secondary px-5 py-2 disabled:opacity-60"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        <article className="glass-panel overflow-hidden rounded-3xl">
          {post.image && (
            <div className="relative h-96">
              <img
                src={getImageUrl(post.image)}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
            </div>
          )}
          <div className="space-y-8 p-8 sm:p-12">
            <div
              className="prose prose-invert max-w-none leading-relaxed text-slate-100 prose-headings:mt-10 prose-headings:text-white prose-a:text-indigo-300 hover:prose-a:text-indigo-200 prose-strong:text-white prose-blockquote:border-indigo-400 prose-blockquote:text-slate-200"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Author spotlight</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-lg font-semibold text-white">{post.author}</p>
                  <p className="text-sm text-slate-400">
                    Storyteller • {post.author && post.author.split(' ')[0]} Publishing
                  </p>
                </div>
                <Link to="/add-post" className="btn-secondary px-6 py-2 text-sm">
                  Write your own story
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;

