import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard');
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const user = await jwtVerify(token, secret);
      const roles= user?.payload?.roles || [];    
      if (roles.includes('admin')) {           
        return NextResponse.redirect(new URL('/admin', req.url)); // Redirect if admin
      }

      return NextResponse.next(); // Token is valid
    } catch (err) {
      console.error('JWT verification failed:', err);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next(); // Allow access to public routes
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
