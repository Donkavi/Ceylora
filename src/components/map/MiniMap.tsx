'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { useNearViewport } from '@/lib/hooks';
import type { MapPoint } from './types';

const IslandMap = dynamic(() => import('./IslandMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#0f3a4a]" />,
});

/** A compact map of one destination and its neighbours; markers link to their pages. */
export function MiniMap({ points, focus }: { points: MapPoint[]; focus: string }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearViewport(ref);
  const visible = useMemo(() => new Set(points.map((p) => p.slug)), [points]);

  return (
    <div ref={ref} className="relative h-[28rem] overflow-hidden rounded-2xl bg-[#0f3a4a] md:h-[34rem]">
      {near && (
        <IslandMap
          points={points}
          visible={visible}
          selected={null}
          highlight={focus}
          onSelect={(slug) => slug !== focus && router.push(`/destinations/${slug}`)}
          baseLayer="satellite"
          focusOffset={{ x: 0, y: 0 }}
          fitKey="mini"
          initialZoom={8}
          initialBounds={points.map((p) => p.coordinates)}
          compactTooltips
        />
      )}
    </div>
  );
}
