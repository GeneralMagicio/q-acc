// app/api/link-store/route.ts

import { NextResponse } from 'next/server';
import { getMongoDB } from '@/lib/db';
import { PRIVADO_LINK_COLLECTION_NAME } from '@/lib/constants/privado';
import { IPrivadoStoredData } from '@/types/privado.type';
import type { NextRequest } from 'next/server';

function setCORSHeaders(response: NextResponse, origin: string) {
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') || '*';
  try {
    const { searchParams } = request.nextUrl;
    const id = searchParams.get('id');

    if (!id) {
      const response = NextResponse.json(
        { error: 'Missing id parameter' },
        { status: 400 },
      );
      return setCORSHeaders(response, origin);
    }

    const db = await getMongoDB();
    const collection = db.collection<IPrivadoStoredData>(
      PRIVADO_LINK_COLLECTION_NAME,
    );

    const result = await collection.findOne({ _id: id });

    if (!result) {
      const response = NextResponse.json(
        { error: `Item not found: ${id}` },
        { status: 404 },
      );
      return setCORSHeaders(response, origin);
    }

    const response = NextResponse.json(result.data, { status: 200 });
    return setCORSHeaders(response, origin);
  } catch (error) {
    console.error('Error in GET handler:', error);
    const response = NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
    return setCORSHeaders(response, origin);
  }
}

export async function OPTIONS(request: NextRequest) {
  // Handle preflight requests
  const origin = request.headers.get('origin') || '*';
  const response = NextResponse.json({}, { status: 204 });
  return setCORSHeaders(response, origin);
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Ensure the route is treated as dynamic
