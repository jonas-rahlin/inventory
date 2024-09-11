import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

//Initiate prisma client to interact with database
const prisma = new PrismaClient();

//Get all Inventory items
export async function GET() {
  try {
    const items = await prisma.inventoryItem.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching items' }, { status: 500 });
  }
}

//Add new Inventory Item
export async function POST(req) {
    try {
      const body = await req.json();
      const { name, description, quantity, category } = body;

      //If any fields are missing, then an return error.
      if (!name || !description || quantity === undefined || !category) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      //Body for object for new Inventory Item
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
      //Error Handling
      console.error('Error creating item:', error);
      return NextResponse.json({ error: 'Error creating item', details: error.message }, { status: 500 });
    }
  }

  //Delete Iventory Item
  export async function DELETE(req) {
  try {
    //Target selected Item
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    //If the item exists, then return error.
    if (!id) {
      return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
    }

    //Delete Inventory Item
    const deletedItem = await prisma.inventoryItem.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    //Error Handling
    console.error('Error deleting item:', error); // Log the error to the server console
    return NextResponse.json({ error: 'Error deleting item', details: error.message }, { status: 500 });
  }
}