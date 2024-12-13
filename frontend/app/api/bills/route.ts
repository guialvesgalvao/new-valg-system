import { NextResponse } from "next/server";
// import { faker } from "@faker-js/faker";
import { PrismaClient as MySQLPrismaClient } from '../../../generated/mysql';
import { PrismaClient as MongoDBPrismaClient } from '../../../generated/mongodb';

const mysqlPrisma = new MySQLPrismaClient();
const mongodbPrisma = new MongoDBPrismaClient();


export async function GET() {
  try {
    const bills = await mysqlPrisma.bills.findMany();
    const teste = await mongodbPrisma.invoice.createMany({data: {id_reference: 3, name: 'teste3'}})
    console.log(teste)
    return NextResponse.json(bills);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Faield to retrieve bills" });
  }
}

export async function POST(req: Request) {
  try {
    const { bill_name, amount, due_date } = await req.json();
    const newBill = await mysqlPrisma.bills.create({
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

    const updatedBill = await mysqlPrisma.bills.update({
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
