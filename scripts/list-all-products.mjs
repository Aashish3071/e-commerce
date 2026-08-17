import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      handle: true,
      subtitle: true,
      status: true,
    }
  });

  console.log("=== ALL PRODUCTS IN DATABASE ===");
  console.log(JSON.stringify(products, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
