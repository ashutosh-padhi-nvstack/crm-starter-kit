import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect to dashboard - no auth check needed
  redirect('/dashboard/overview');
}
