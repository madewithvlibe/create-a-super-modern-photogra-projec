'use client';
import { EditModeProvider } from '@withvlibe/editmode-sdk/react';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <EditModeProvider>{children}</EditModeProvider>;
}
