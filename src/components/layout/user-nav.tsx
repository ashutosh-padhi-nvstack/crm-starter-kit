'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { mockUserStore } from '@/lib/mock-user';
import { useMockUser } from '@/hooks/use-mock-user';
import { useRouter } from 'next/navigation';
import { IconUserCircle, IconLogout, IconKey, IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';

export function UserNav() {
  const { user } = useMockUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await mockUserStore.signOut();
    router.push('/auth/sign-in');
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <UserAvatarProfile user={user} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56'
          align='end'
          sideOffset={10}
          forceMount
        >
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm leading-none font-medium'>
                {user.fullName}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
              <IconUserCircle className='mr-2 h-4 w-4' />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href='/auth/forgot-password' className='flex items-center'>
                <IconKey className='mr-2 h-4 w-4' />
                Change Password
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <IconLogout className='mr-2 h-4 w-4' />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  // Show sign in option when user is not logged in
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted'>
            <IconUserCircle className='h-4 w-4' />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        sideOffset={10}
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              Guest User
            </p>
            <p className='text-muted-foreground text-xs leading-none'>
              Not signed in
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/auth/sign-in' className='flex items-center'>
              <IconUserCircle className='mr-2 h-4 w-4' />
              Sign In
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/auth/sign-up' className='flex items-center'>
              <IconUserPlus className='mr-2 h-4 w-4' />
              Sign Up
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/auth/forgot-password' className='flex items-center'>
              <IconKey className='mr-2 h-4 w-4' />
              Forgot Password
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
