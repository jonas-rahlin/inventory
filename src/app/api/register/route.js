import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({
      message: 'User registered successfully',
      user: newUser
    }), { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
      return new Response(JSON.stringify({
        error: 'User with this email already exists'
      }), { status: 400 });
    } else {
      return new Response(JSON.stringify({
        error: 'Internal server error'
      }), { status: 500 });
    }
  }
}
