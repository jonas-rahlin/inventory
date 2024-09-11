import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Initiate Prisma Client
const prisma = new PrismaClient();

// Register User function
export async function POST(req) {
  try {
    // Retrieve Registration info
    const { name, email, password } = await req.json();

    //If all fields are not correctly filled, then report Error
    if (!name || !email || !password) {
      return new Response(JSON.stringify({
        error: 'Missing required fields'
      }), { status: 400 });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creat the new User
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({
      message: 'Registration success',
      user: newUser
    }), { status: 201 });

  } catch (error) {
    if (error.code === 'P2002') {
      return new Response(JSON.stringify({
        error: 'Email already exists'
      }), { status: 400 });
    } else {
      return new Response(JSON.stringify({
        error: 'Internal server error'
      }), { status: 500 });
    }
  }
}

