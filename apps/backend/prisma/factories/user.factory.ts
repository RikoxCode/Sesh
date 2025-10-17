import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { faker } from '@faker-js/faker';

export async function createDefaultUsers(
  usersService: UsersService,
  rolesService: RolesService,
) {
  const roles = await rolesService.getRoles();
  for (let i = 0; i < 10; i++) {
    await usersService.createUser({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      abbreviation: faker.string.sample(3),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: roles[Math.floor(Math.random() * roles.length)].id,
    });
  }
}
