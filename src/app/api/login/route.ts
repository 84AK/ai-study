import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
