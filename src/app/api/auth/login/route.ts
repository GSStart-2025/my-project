import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/lib/User';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email,roles : user.roles,name:user.name },
    process.env.JWT_SECRET || 'your-secret-key',  // Use a secure secret from .env
    { expiresIn: '1h' }  // Set token expiration (e.g., 1 hour)
  );

  // Set JWT token in cookies
  const res = NextResponse.json({ message: 'Login successful' });
  res.cookies.set('auth_token', token, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === 'production', // Secure cookie in production
    maxAge: 60 * 60, // 1 hour
  });


  return res;
}
