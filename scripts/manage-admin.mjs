import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to database...');
  
  // 1. Check existing users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: {
        select: {
          name: true,
        }
      }
    }
  });

  console.log('Existing Users in Database:', users);

  // 2. Check roles
  let adminRole = await prisma.role.findFirst({
    where: {
      name: { equals: 'Admin', mode: 'insensitive' }
    }
  });

  if (!adminRole) {
    console.log('Creating Admin role with full permissions...');
    adminRole = await prisma.role.create({
      data: {
        name: 'Admin',
        description: 'Full Administrator Permissions',
        canManageProducts: true,
        canManageUsers: true,
        canManageOrders: true,
        canManageSettings: true,
        canManagePromotions: true,
        canManageInventory: true,
        canManageCustomers: true,
        canManageContent: true,
      }
    });
  }

  // 3. Create or update admin user
  const adminEmail = 'admin@openfront.io';
  const adminPassword = 'AdminPassword123!';

  // Generate bcrypt hash for password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const existingAdmin = await prisma.user.findFirst({
    where: {
      email: adminEmail,
    }
  });

  if (existingAdmin) {
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: {
        password: hashedPassword,
        roleId: adminRole.id,
      }
    });
    console.log(`Updated existing user ${adminEmail}`);
  } else {
    await prisma.user.create({
      data: {
        name: 'Openfront Admin',
        email: adminEmail,
        password: hashedPassword,
        roleId: adminRole.id,
      }
    });
    console.log(`Created new admin user ${adminEmail}`);
  }

  console.log('\n======================================');
  console.log('ADMIN CREDENTIALS:');
  console.log(`Email:    ${adminEmail}`);
  console.log(`Password: ${adminPassword}`);
  console.log('======================================\n');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
