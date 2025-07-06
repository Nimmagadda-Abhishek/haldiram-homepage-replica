import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_URL } from '../lib/config';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !email || !phone || !address || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/customers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed.');
        return;
      }
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError('Registration failed.');
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
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Customer Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-primary font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
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
            <label className="block text-primary font-semibold mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-primary font-semibold mb-2">Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={address}
              onChange={e => setAddress(e.target.value)}
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
          >
            Register
          </button>
        </form>
        <div className="text-center mt-6 text-primary-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors">Login</Link>
        </div>
      </motion.div>
    </div>
  );
}