'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/user'); // Get the logged-in user
        if (res.ok) {
          const data = await res.json();
          if(data.user.roles){
              if(data.user.roles[0] !== 'admin') window.location.href = '/login';
          }
          setUser(data.user);
        } else {
          setError('Access denied.');
           window.location.href = '/login'; // Not logged in
        }
      } catch (err) {
        setError('An error occurred.');
         window.location.href = '/login'; // Not logged in
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  );
}
