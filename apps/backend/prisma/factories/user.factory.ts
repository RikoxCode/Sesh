import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

export async function createDefaultUsers(
  usersService: UsersService,
  rolesService: RolesService,
) {
  // ESM-Package dynamisch laden (funktioniert unter CJS/ts-node)
  const { faker } = await import('@faker-js/faker');

  const roles = await rolesService.getRoles();
  if (!roles.length) return;

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    await usersService.createUser({
      firstName,
      lastName,
      abbreviation: faker.string.alpha({ length: 3 }).toUpperCase(),
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
      roleId: roles[Math.floor(Math.random() * roles.length)].id,
    });
  }
}
