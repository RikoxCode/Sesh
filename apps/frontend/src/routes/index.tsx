import { createFileRoute, redirect } from '@tanstack/react-router';
import HomeView from '../views/HomeView';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const authed = !!localStorage.getItem('sesh_token');
    if (!authed) throw redirect({ to: '/login' });
  },
  component: HomeView,
});
