'use client';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { mockUserStore } from '@/lib/mock-user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function SignInViewPage({ stars }: { stars: number }) {
  const router = useRouter();
  const [email, setEmail] = useState('partner@compass.biz');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await mockUserStore.signIn(email, password);
        toast.success('Signed in successfully!');
        router.push('/dashboard/overview');
      } catch (error) {
        toast.error('Failed to sign in');
      }
    });
  };

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/dashboard/overview'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Go to Dashboard
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <div className='mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-6 w-6'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
            </svg>
          </div>
          <span className='text-xl font-bold'>CRM</span>
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Streamline your visa processing workflow with our comprehensive B2B platform. Manage applications, track status, and process visas efficiently.&rdquo;
            </p>
            <footer className='text-sm'>CRM Platform</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Welcome Back</h1>
            <p className='text-muted-foreground text-sm'>
              Sign in to your CRM account
            </p>
          </div>

          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access the CRM dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='partner@compass.biz'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='password'>Password</Label>
                    <Link
                      href='/auth/forgot-password'
                      className='text-primary hover:underline text-xs'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                  />
                  <p className='text-xs text-muted-foreground'>
                    Demo mode: Any email/password will work
                  </p>
                </div>
                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              <div className='mt-4 text-center text-sm'>
                <span className='text-muted-foreground'>Don&apos;t have an account? </span>
                <Link
                  href='/auth/sign-up'
                  className='text-primary hover:underline font-medium'
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className='text-muted-foreground px-8 text-center text-xs'>
            By signing in, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
