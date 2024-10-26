import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

export async function GET() {
  let bills = [];

  for (let i = 0; i < 5; i++) {
    bills.push({
      id: i,
      amount: parseFloat(faker.commerce.price()),
      created_at: faker.date.recent(),
      modified_at: faker.date.recent(),
    });
  }

  return NextResponse.json(bills);
}

export async function POST(req: Request) {
  try {
    const { amount, created_at, modified_at } = JSON.parse(await req.text());

    return NextResponse.json({
      amount,
      created_at,
      modified_at,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(req: Request) {
  try {
    const { id } = await req.json();

    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json(error);
  }
}
