import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//get
export async function GET() {
  try {
    const items = await prisma.inventoryItem.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching items' }, { status: 500 });
  }
}

//post
export async function POST(req) {
    try {
      const body = await req.json();
      const { name, description, quantity, category } = body;
  
      // Basic validation
      if (!name || !description || quantity === undefined || !category) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const newItem = await prisma.inventoryItem.create({
        data: {
          name,
          description,
          quantity,
          category,
        },
      });
  
      return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
      console.error('Error creating item:', error); // Log the error to the server console
      return NextResponse.json({ error: 'Error creating item', details: error.message }, { status: 500 });
    }
  }

  //delete
  export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    const deletedItem = await prisma.inventoryItem.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error); // Log the error to the server console
    return NextResponse.json({ error: 'Error deleting item', details: error.message }, { status: 500 });
  }
}

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

  //Expandera error handling, kommentera ut funktionerna.