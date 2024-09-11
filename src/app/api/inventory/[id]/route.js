import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//update
export async function PUT(req) {
    try {
      const { id, name, description, quantity, category } = await req.json();
      
      if (!id || !name || !description || !quantity || !category) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const updatedItem = await prisma.inventoryItem.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          description,
          quantity,
          category
        }
      });
  
      return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating item' }, { status: 500 });
    }
  }