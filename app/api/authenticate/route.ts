import { generateToken } from '@/services/token';
import { NextRequest, NextResponse } from 'next/server';

const USER = {
  email: 'aman.mender@gmail.com',
  password: 'lemmeCall!Br02024',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (email === USER.email && password === USER.password) {
      const token = generateToken({ userId: '123', email: USER.email });
      return NextResponse.json({ success: true, message: 'Authentication successful', token: token }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
