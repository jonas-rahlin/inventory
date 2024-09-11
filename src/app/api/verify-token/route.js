import { verifyJWT } from '@/utils/jwt'; // Adjust the path if necessary
import { NextResponse } from 'next/server';

export async function POST(req) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifyJWT(token); // Use the verifyJWT function

    // Token is valid
    return NextResponse.json({ message: 'Token is valid', payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
  }
}
