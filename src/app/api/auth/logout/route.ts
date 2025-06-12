import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out successfully' });
    // Remove the JWT token from the cookies by setting it to an empty value and expiration date in the past
    response.cookies.delete('auth_token');
    return response;
}
