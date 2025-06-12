'use client'; // 👈 MUST be the first line

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  
  
  const handleLogout = async () => {
    console.log(123);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login'); // 🔁 redirect after logout
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}
