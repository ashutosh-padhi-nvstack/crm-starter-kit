'use client';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { IconMail, IconCheck } from '@tabler/icons-react';

export default function ForgotPasswordViewPage() {
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email!');
    });
  };

  if (isSubmitted) {
    return (
      <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
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
                &ldquo;Your security is our priority. We&apos;ve sent you a secure password reset link.&rdquo;
              </p>
              <footer className='text-sm'>CRM Platform</footer>
            </blockquote>
          </div>
        </div>
        <div className='flex h-full items-center justify-center p-4 lg:p-8'>
          <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
            <Card className='w-full'>
              <CardHeader className='text-center'>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20'>
                  <IconCheck className='h-8 w-8 text-green-600 dark:text-green-400' />
                </div>
                <CardTitle>Check Your Email</CardTitle>
                <CardDescription>
                  We&apos;ve sent a password reset link to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='rounded-lg border bg-muted/50 p-4'>
                  <div className='flex items-start gap-3'>
                    <IconMail className='mt-0.5 h-5 w-5 text-muted-foreground' />
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>What&apos;s next?</p>
                      <p className='text-muted-foreground text-sm'>
                        Click the link in the email to reset your password. The link will expire in 1 hour.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant='outline'
                    className='w-full'
                  >
                    Resend Email
                  </Button>
                  <Link href='/auth/sign-in' className='block'>
                    <Button variant='ghost' className='w-full'>
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/auth/sign-in'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 left-4 md:top-8 md:left-8'
        )}
      >
        ← Back to Sign In
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
              &ldquo;Forgot your password? No worries. We&apos;ll help you get back into your account securely.&rdquo;
            </p>
            <footer className='text-sm'>CRM Platform</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Forgot Password?</h1>
            <p className='text-muted-foreground text-sm'>
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
          </div>

          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                We&apos;ll send you a password reset link via email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-4'>
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
                  <p className='text-xs text-muted-foreground'>
                    Enter the email address associated with your CRM account
                  </p>
                </div>
                <Button type='submit' className='w-full' disabled={isPending || !email}>
                  {isPending ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              <div className='mt-4 text-center text-sm'>
                <span className='text-muted-foreground'>Remember your password? </span>
                <Link
                  href='/auth/sign-in'
                  className='text-primary hover:underline font-medium'
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className='text-muted-foreground px-8 text-center text-xs'>
            Need help? Contact{' '}
            <Link
              href='mailto:support@compass.biz'
              className='hover:text-primary underline underline-offset-4'
            >
              support@compass.biz
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

