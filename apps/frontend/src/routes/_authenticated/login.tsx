import { createFileRoute } from '@tanstack/react-router';
import LoginView from '../../views/LoginView';

export const Route = createFileRoute('/_authenticated/login')({
  component: LoginView,
});
