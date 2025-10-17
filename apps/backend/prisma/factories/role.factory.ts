import { RolesService } from 'src/roles/roles.service';

export async function createDefaultRoles(rolesService: RolesService) {
  const roles = ['Praxisbildner', 'Lernende'];

  for (const name of roles) {
    console.log(`Creating role: ${name}`);
    await rolesService.createRole({
      name,
    });
  }
}
