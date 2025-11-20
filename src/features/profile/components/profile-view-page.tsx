'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { useMockUser } from '@/hooks/use-mock-user';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfileViewPage() {
  const { user } = useMockUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || '');

  const handleSave = () => {
    // In a real app, this would update the user profile
    toast.success('Profile updated successfully!');
  };

  if (!user) {
    return (
      <div className='flex w-full flex-col p-4'>
        <p>No user logged in</p>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col p-4 space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center space-x-4'>
            <UserAvatarProfile user={user} className='h-20 w-20' showInfo={false} />
            <div>
              <h3 className='text-lg font-semibold'>{user.fullName}</h3>
              <p className='text-sm text-muted-foreground'>{user.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>

          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='firstName'>First Name</Label>
              <Input
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
