import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const AddPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (!image) return '';

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
      let imageUrl = '';
      if (image) {
        imageUrl = await uploadImage();
      }

      await api.post('/posts', {
        title,
        author: user.username,
        content,
        image: imageUrl
      });

      toast.success('Post created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen page-section">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 max-w-3xl space-y-4">
          <span className="badge-soft">Compose brilliance</span>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Bring your next big idea to life
          </h1>
          <p className="text-base text-slate-300">
            Craft rich storytelling experiences with immersive imagery and a powerful editor.
            Publish confidently knowing every post is secured by author-only controls.
          </p>
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
                placeholder="Enter an unforgettable headline"
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
                <label className="text-sm font-medium text-slate-200">Upload cover image</label>
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
                <p className="text-xs text-slate-400">Recommended 1280×720px, JPG or PNG.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Post content</label>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                <Editor
                  apiKey="7melu64eccel3i900f0ujul0ckhwhs84a2xabcgfrdj07o8j"
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
                {loading ? 'Publishing…' : 'Publish Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="btn-secondary px-8 py-3 text-base"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="glass-panel sticky top-32 space-y-6 rounded-3xl p-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30" />
                <div>
                  <p className="text-sm font-semibold text-indigo-200">Live preview</p>
                  <p className="text-xs text-slate-300">Instantly see how your cover will appear.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-64 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-slate-900 text-sm text-slate-500">
                    Cover image preview
                  </div>
                )}
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  Elevate your post with a captivating hero image.
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                  Use headings and quotes to break up long paragraphs.
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-pink-400" />
                  Add links or embeds to enrich your storytelling.
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

export default AddPost;

