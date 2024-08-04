// src/app/api/register/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password || !role) {
    return NextResponse.json({ message: 'Name, email, password, and role are required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Check if the email is already in use
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'Email is already in use' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error); // Log for debugging
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
