'use server';

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'pancakes'; // Use environment variable in production

interface TokenPayload {
  userId: string;
  email: string;
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export async function decodeToken(token: string): Promise<TokenPayload | null> {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
