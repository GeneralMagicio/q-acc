// app/api/link-store/route.ts

// eslint-disable-next-line import/named
import { NextResponse } from 'next/server';
import { getMongoDB } from '@/lib/db';
import { PRIVADO_LINK_COLLECTION_NAME } from '@/lib/constants/privado';
import { IPrivadoStoredData } from '@/types/privado.type';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 },
      );
    }

    const db = await getMongoDB();
    const collection = db.collection<IPrivadoStoredData>(
      PRIVADO_LINK_COLLECTION_NAME,
    );

    const result = await collection.findOne({ _id: id });

    if (!result) {
      return NextResponse.json(
        { error: `Item not found: ${id}` },
        { status: 404 },
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export const runtime = 'nodejs'; // Ensure the code runs in a Node.js environment
