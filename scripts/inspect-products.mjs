import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      handle: true,
      subtitle: true,
      thumbnail: true,
      productCollections: { select: { collection: { select: { title: true } } } },
      productCategories: { select: { title: true } },
    }
  });

  console.log("=== ALL PRODUCTS (" + products.length + ") ===");
  console.log(JSON.stringify(products, null, 2));

  const collections = await prisma.collection.findMany({
    select: { id: true, title: true, handle: true }
  });
  console.log("\n=== ALL COLLECTIONS ===");
  console.log(JSON.stringify(collections, null, 2));

  const categories = await prisma.productCategory.findMany({
    select: { id: true, title: true, handle: true }
  });
  console.log("\n=== ALL CATEGORIES ===");
  console.log(JSON.stringify(categories, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
