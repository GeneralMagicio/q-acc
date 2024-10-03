'use client';
import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';

import { ClientOnly } from './ClientOnly';
import type { WidgetConfig } from '@lifi/widget';

export function Widget() {
  const config = {
    appearance: 'light',
    theme: {
      container: {
        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
      },
    },
  } as Partial<WidgetConfig>;

  return (
    <div>
      <ClientOnly fallback={<WidgetSkeleton config={config} />}>
        <LiFiWidget config={config} integrator='nextjs-example' />
      </ClientOnly>
    </div>
  );
}
