import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-indigo-500/20"
    >
      {post.image && (
        <div className="relative mb-6 h-48 overflow-hidden rounded-2xl">
          <img
            src={`https://full-stack-blog-website-aurora-blog-1.onrender.com/${post.image}`}
            alt={post.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="badge-soft absolute left-4 top-4">Featured</span>
        </div>
      )}
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-indigo-300/80">
            By {post.author}
          </p>
          <h2 className="text-2xl font-semibold leading-tight text-white transition group-hover:text-indigo-200 line-clamp-2">
            {post.title}
          </h2>
          <div
            className="text-sm leading-relaxed text-slate-300 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: post.content.substring(0, 180) + '…'
            }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="inline-flex items-center gap-2 text-indigo-300 transition group-hover:text-indigo-200">
            Read Post
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M13.5 4.5a.75.75 0 0 0 0 1.5h4.19l-8.72 8.72a.75.75 0 1 0 1.06 1.06l8.72-8.72v4.19a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-.75-.75h-6Z" />
              <path d="M6.75 5.25A2.25 2.25 0 0 0 4.5 7.5v11.25A1.5 1.5 0 0 0 6 20.25h11.25a2.25 2.25 0 0 0 2.25-2.25v-3a.75.75 0 0 0-1.5 0v3c0 .414-.336.75-.75.75H6a.75.75 0 0 1-.75-.75V7.5c0-.414.336-.75.75-.75h3a.75.75 0 0 0 0-1.5h-3Z" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

