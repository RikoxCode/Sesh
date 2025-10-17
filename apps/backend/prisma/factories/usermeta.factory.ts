import { UsermetasService } from 'src/usermetas/usermetas.service';
import { UsersService } from 'src/users/users.service';

export async function createDefaultUsermetas(
  usermetasService: UsermetasService,
  usersService: UsersService,
) {
  const users = await usersService.getUsers();

  const themes = ['light', 'dark', 'system'];
  const languages = ['de', 'en', 'fr', 'it'];
  const timezones = ['Europe/Zurich', 'Europe/Berlin', 'UTC'];
  const notifications = ['enabled', 'disabled'];

  const defaultUsermetas = users.flatMap((user) => [
    {
      userId: user.id,
      metaKey: 'theme',
      metaValue: themes[Math.floor(Math.random() * themes.length)],
    },
    {
      userId: user.id,
      metaKey: 'language',
      metaValue: languages[Math.floor(Math.random() * languages.length)],
    },
    {
      userId: user.id,
      metaKey: 'timezone',
      metaValue: timezones[Math.floor(Math.random() * timezones.length)],
    },
    {
      userId: user.id,
      metaKey: 'notifications',
      metaValue:
        notifications[Math.floor(Math.random() * notifications.length)],
    },
    {
      userId: user.id,
      metaKey: 'lastLogin',
      metaValue: new Date(
        Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ]);

  return Promise.all(
    defaultUsermetas.map((meta) => usermetasService.createUsermeta(meta)),
  );
}
