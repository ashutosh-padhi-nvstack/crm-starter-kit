import { redirect } from 'next/navigation';

export default function Dashboard() {
  // Redirect to overview - no auth check needed
  redirect('/dashboard/overview');
}
