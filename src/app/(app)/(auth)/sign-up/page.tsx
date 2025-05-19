import SignUpView from '@/modules/auth/ui/sign-up-view';
import { caller } from '@/trpc/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { user } = await caller.auth.session();

  if (user) redirect('/');

  return <SignUpView />;
}
