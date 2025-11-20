import { Metadata } from 'next';
import ForgotPasswordViewPage from '@/features/auth/components/forgot-password-view';

export const metadata: Metadata = {
  title: 'CRM | Forgot Password',
  description: 'Reset your CRM password. We\'ll send you a secure reset link.'
};

export default function Page() {
  return <ForgotPasswordViewPage />;
}

