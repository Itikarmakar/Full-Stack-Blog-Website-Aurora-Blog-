import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signup(data.username, data.email, data.password);
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen page-section">
      <Header />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <span className="badge-soft">Join the collective</span>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Build your voice with Aurora Blog
          </h2>
          <p className="text-base text-slate-300">
            Create an account to publish original stories, curate collections, and grow your readership.
            Everything starts with a single idea—let&apos;s bring yours to life.
          </p>
        </div>

        <div className="form-card mx-auto w-full max-w-md">
          <h2 className="text-2xl font-semibold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-slate-300">
            Start publishing in minutes. No credit card required.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Username</label>
              <input
                type="text"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
                className="input-field"
                placeholder="Choose a display name"
              />
              {errors.username && (
                <p className="text-xs font-medium text-rose-400">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email format',
                  },
                })}
                className="input-field"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs font-medium text-rose-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="input-field"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-xs font-medium text-rose-400">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-300">
            Already part of Aurora?{' '}
            <Link to="/login" className="text-indigo-300 hover:text-indigo-200">
              Login to continue
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;

