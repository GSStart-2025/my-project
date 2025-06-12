import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/lib/User';
import connectToDatabase from '@/lib/mongodb'; 
import { z } from 'zod';
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log("newUser");
  try {
    const parsed = schema.parse(body);

    const { name, email, password } = parsed;
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    // Create a user with a default role of 'user'
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roles: ['user'], // Default role is 'user'
    });
    console.log(newUser);

    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }
}
