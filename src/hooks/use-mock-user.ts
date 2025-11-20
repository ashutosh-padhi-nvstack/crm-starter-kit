/**
 * React hook to use mock user (replaces useUser from Clerk)
 * This is a client-side hook that provides mock user data
 */
'use client';

import { mockUserStore, type MockUser } from '@/lib/mock-user';
import { useEffect, useState } from 'react';

export function useMockUser() {
  const [user, setUser] = useState<MockUser | null>(mockUserStore.getCurrentUser());
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    // Sync with store
    setUser(mockUserStore.getCurrentUser());
    setIsLoaded(true);
  }, []);

  return { user, isLoaded };
}

