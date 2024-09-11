import { verifyJWT } from '@/utils/jwt'; // Adjust the path if necessary
import { NextResponse } from 'next/server';

//Verify JWT function
export async function POST(req) {
  //Retrieve Token
  const authHeader = req.headers.get('Authorization');

  //If the token doesnt exists or is not proper, return Error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
  }

  //Extract Token
  const token = authHeader.split(' ')[1];

  try {
    //Verify the token
    const payload = await verifyJWT(token);

    return NextResponse.json({ message: 'Token is valid', payload }, { status: 200 });
  } catch (error) {
    //Error Handling
    return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
  }
}
