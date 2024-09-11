import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jwt from '@/utils/jwt'; // Adjust the path if necessary

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(JSON.stringify({
        error: 'Invalid email or password'
      }), { status: 401 });
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return new Response(JSON.stringify({
        error: 'Invalid email or password'
      }), { status: 401 });
    }

    // Generate JWT
    const token = await jwt.signJWT({ userId: user.id, email: user.email });

    // Login successful
    return new Response(JSON.stringify({
      token, // Include JWT in the response
      user  // Optionally include user details
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), { status: 500 });
  }
}