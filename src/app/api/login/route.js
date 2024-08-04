// src/app/api/login/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      console.log('User not found:', email); // Log for debugging
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email); // Log for debugging
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Include user information in the response
    return NextResponse.json({
      token,
      name: user.name, // Assuming `name` is a field in your user document
      role: user.role  // Assuming `role` is a field in your user document
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error); // Log for debugging
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
