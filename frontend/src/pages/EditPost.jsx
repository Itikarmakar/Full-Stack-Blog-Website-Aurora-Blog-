import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`);
      const post = response.data;

      // Check if user is the author
      if (post.authorId.toString() !== user._id.toString()) {
        toast.error('You are not authorized to edit this post');
        navigate('/home');
        return;
      }

      setTitle(post.title);
      setContent(post.content);
      setExistingImage(post.image || '');
    } catch (error) {
      toast.error('Failed to fetch post');
      navigate('/home');
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!image) return existingImage;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.imageUrl;
    } catch (error) {
      toast.error('Failed to upload image');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage();

      await api.put(`/posts/${id}`, {
        title,
        content,
        image: imageUrl
      });

      toast.success('Post updated successfully!');
      navigate(`/posts/${id}`);
    } catch (error) {
      toast.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen page-section">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-slate-300">
            <span className="h-12 w-12 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Loading draft…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-section">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-4">
            <span className="badge-soft">Refine your narrative</span>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Edit post</h1>
            <p className="max-w-2xl text-base text-slate-300">
              Make last-minute tweaks, refresh imagery, and polish formatting with confidence.
              Your changes are secured—only you can edit this story.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-4 text-sm text-slate-300">
            <p className="font-medium text-indigo-200">Last review</p>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="form-card space-y-7">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="Give your story a captivating headline"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Author</label>
                <input
                  type="text"
                  value={user?.username || ''}
                  disabled
                  className="input-field cursor-not-allowed border-dashed text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Refresh cover image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input-field cursor-pointer pr-12 file:hidden"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                    ⇪
                  </span>
                </div>
                <p className="text-xs text-slate-400">Leave blank to keep your existing artwork.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Post content</label>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                <Editor
                  apiKey="no-api-key"
                  value={content}
                  onEditorChange={(value) => setContent(value)}
                  init={{
                    height: 420,
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'help',
                      'wordcount'
                    ],
                    toolbar:
                      'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat | help',
                    content_style:
                      'body { font-family:Inter, system-ui, sans-serif; font-size:14px; color:#e2e8f0; background-color:#020617; }',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-8 py-3 text-base disabled:opacity-60"
              >
                {loading ? 'Updating…' : 'Save changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/posts/${id}`)}
                className="btn-secondary px-8 py-3 text-base"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="glass-panel sticky top-32 space-y-6 rounded-3xl p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-xl text-white shadow-lg shadow-indigo-500/30">
                  ✨
                </div>
                <div>
                  <p className="text-sm font-semibold text-indigo-200">Current artwork</p>
                  <p className="text-xs text-slate-300">Preview or replace the cover image.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-64 w-full object-cover"
                  />
                ) : existingImage ? (
                  <img
                    src={existingImage}
                    alt="Current"
                    className="h-64 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-slate-900 text-sm text-slate-500">
                    No cover image set
                  </div>
                )}
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  Focus on clarity—short paragraphs improve readability.
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                  Highlight key takeaways with bold text or callouts.
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                  Add metadata to enhance SEO and discoverability.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;

