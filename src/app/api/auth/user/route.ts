import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req: Request) {  
  const token = req.cookies.get('auth_token').value;
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  try {
    const user = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.json({ user: user.payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
