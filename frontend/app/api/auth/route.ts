import { NextResponse } from 'next/server';

export async function validateUser(request: Request) {
  console.log(request) // Lógica para buscar usuários
  return NextResponse.json(request);
}

export async function createUser(request: Request) {
  
    const newUser = await request.json();
  
  return NextResponse.json({ success: true });
}
