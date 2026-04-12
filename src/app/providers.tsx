'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect, useState } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    posthog.init('phc_B5ehgMLz9SDxSd3evaeiXWBfa7GmhoYPW6fUVejtm4cA', {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    });
    setReady(true);
  }, []);

  if (!ready) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  );
}
