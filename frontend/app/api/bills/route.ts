import { NextResponse } from "next/server";
// import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bills = await prisma.bills.findMany();
    return NextResponse.json(bills);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Faield to retrieve bills" });
  }
}

export async function POST(req: Request) {
  try {
    const { bill_name, amount, due_date } = await req.json();
    const newBill = await prisma.bills.create({
      data: {
        amount,
        bill_name,
        due_date: new Date(due_date)
      }
    });

    return NextResponse.json(newBill);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create bill" });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, amount, bill_name, due_date } = await req.json();

    const updatedBill = await prisma.bills.update({
      where: { id },
      data: {
        amount,
        bill_name,
        due_date: new Date(due_date)
      }
    })

    return NextResponse.json(updatedBill);
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: "Failed to Update bill"});
  }
}
