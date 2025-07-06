import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_URL } from '../lib/config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed.');
        setLoading(false);
        return;
      }
      // Store user in localStorage
      localStorage.setItem('customer', JSON.stringify(data.customer));
      navigate('/account');
    } catch (err) {
      setError('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-midnight-light py-8 sm:py-12">
      <motion.div
        className="bg-gradient-midnight-subtle rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Customer Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-primary font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-primary bg-gradient-midnight-light p-3 rounded-lg text-sm border border-primary/20">{error}</div>}
          <button
            type="submit"
            className="w-full btn-primary-midnight font-bold py-3 rounded-lg shadow-primary hover:shadow-primary-lg transition-all"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-6 text-primary-medium">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors">Register</Link>
        </div>
      </motion.div>
    </div>
  );
}