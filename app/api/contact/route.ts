import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/vlibe-db';

export async function POST(request: NextRequest) {
  try {
    const db = getDatabase();
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Insert into contacts table
    const contact = await db.insert('contacts', {
      name,
      email,
      message,
      status: 'new',
      createdAt: Date.now(),
    });

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error('Failed to save contact:', error);
    return NextResponse.json(
      { error: 'Failed to save contact submission' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = getDatabase();
    const contacts = await db.query('contacts', {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
