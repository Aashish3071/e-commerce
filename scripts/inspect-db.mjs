import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const store = await prisma.store.findFirst();
  console.log("=== STORE ===");
  console.log({
    id: store?.id,
    name: store?.name,
    homepageTitle: store?.homepageTitle,
    homepageDescription: store?.homepageDescription,
    metadata: store?.metadata,
  });

  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      handle: true,
      subtitle: true,
      status: true,
      collection: { select: { title: true, handle: true } },
      productCategories: { select: { title: true, handle: true } },
    }
  });

  console.log("\n=== ALL PRODUCTS (" + products.length + ") ===");
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
