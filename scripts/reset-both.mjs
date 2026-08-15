import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  let adminRole = await prisma.role.findFirst({
    where: { name: { equals: 'Admin', mode: 'insensitive' } }
  });

  // Reset admin@gmail.com
  await prisma.user.updateMany({
    where: { email: 'admin@gmail.com' },
    data: {
      password: hashedPassword,
      roleId: adminRole ? adminRole.id : undefined,
    }
  });

  // Reset admin@openfront.io
  await prisma.user.updateMany({
    where: { email: 'admin@openfront.io' },
    data: {
      password: hashedPassword,
      roleId: adminRole ? adminRole.id : undefined,
    }
  });

  console.log('Both admin@openfront.io and admin@gmail.com set with password: AdminPassword123!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
