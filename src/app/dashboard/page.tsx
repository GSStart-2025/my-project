'use client';
import { useEffect, useState } from 'react';
import LogoutButton from './../components/LogoutButton';
import HomePage from './../components/HomePage';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/user', {
      credentials: 'include', // Send auth_token cookie
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          window.location.href = '/login'; // Not logged in
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        window.location.href = '/login';
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <HomePage/>
      <LogoutButton />
    </div>
  );
}
