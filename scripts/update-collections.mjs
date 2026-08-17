import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const collections = await prisma.productCollection.findMany();
  for (const col of collections) {
    let newTitle = "New Season Active Drops";
    if (col.handle.includes('hoodie') || col.title.toLowerCase().includes('hoodie')) {
      newTitle = "Hoodies & Sweatshirts";
    } else if (col.handle.includes('tshirt') || col.title.toLowerCase().includes('t-shirt')) {
      newTitle = "Performance Tees & Tops";
    } else if (col.handle.includes('accessories') || col.title.toLowerCase().includes('accessories')) {
      newTitle = "Training Accessories";
    }

    await prisma.productCollection.update({
      where: { id: col.id },
      data: { title: newTitle }
    });
    console.log(`Updated collection ${col.id}: ${newTitle}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
