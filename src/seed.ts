import bcrypt from 'bcrypt';

import prisma from './prisma';

export const main = async () => {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      fullName: 'Admin User',
      email: 'admin@example.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Admin seeded');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
