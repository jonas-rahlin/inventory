import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jwt from '@/utils/jwt';

//Initiate Prisma Client
const prisma = new PrismaClient();

//Login Function
export async function POST(req) {
  //Retrieve Login Information
  const { email, password } = await req.json();

  try {
    //Look for existing User Match
    const user = await prisma.user.findUnique({ where: { email } });

    //If no User exists, then report Error 
    if (!user) {
      return new Response(JSON.stringify({
        error: 'Invalid email or password'
      }), { status: 401 });
    }

    //Compare Password Hash
    const match = await bcrypt.compare(password, user.password);

    //If Passwords dont match, then report Error
    if (!match) {
      return new Response(JSON.stringify({
        error: 'Invalid email or password'
      }), { status: 401 });
    }

    // Generate JWT
    const token = await jwt.signJWT({ userId: user.id, email: user.email });

    //Return the User Info
    return new Response(JSON.stringify({
      token,
      user
    }), { status: 200 });
  } catch (error) {
    //Error Handling
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), { status: 500 });
  }
}