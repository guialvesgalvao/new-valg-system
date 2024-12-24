import prisma from "./config/db";

async function getAccount() {
  const rows = await prisma.bill.findMany({
    where: {
      status: "Pending",
    },
  });

  console.log(rows);
}

getAccount();
