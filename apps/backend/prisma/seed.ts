import { createDefaultRoles } from './factories/role.factory';
import { createDefaultUsers } from './factories/user.factory';
import { UsersService } from '../src/users/users.service';
import { RolesService } from '../src/roles/roles.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { createDefaultUsermetas } from './factories/usermeta.factory';
import { UsermetasService } from '../src/usermetas/usermetas.service';

const prisma = new PrismaService();

async function clearDatabase() {
  console.log('🧹 Clearing database...');
  // Reihenfolge beachten wegen Foreign Keys
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.userMeta.deleteMany();
  console.log('✅ Database cleared.');
}

async function main() {
  await clearDatabase();

  const usermetasService = new UsermetasService(prisma);
  const usersService = new UsersService(prisma);
  const rolesService = new RolesService(prisma);

  await createDefaultRoles(rolesService);
  console.log('✅ Roles created or already exist.');

  await createDefaultUsers(usersService, rolesService);
  console.log('✅ Users created or already exist.');

  await createDefaultUsermetas(usermetasService, usersService);
  console.log('✅ User metas created or already exist.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
