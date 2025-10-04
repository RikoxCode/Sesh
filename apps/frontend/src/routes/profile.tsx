import { createFileRoute } from '@tanstack/react-router';
import ProfileView from '../views/ProfileView';

export const Route = createFileRoute('/profile')({
  component: ProfileView,
});
