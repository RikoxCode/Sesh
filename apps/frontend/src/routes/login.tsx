import { createFileRoute } from '@tanstack/react-router';
import LoginView from '../views/LoginView';

export const Route = createFileRoute('/login')({
  component: LoginView,
});
