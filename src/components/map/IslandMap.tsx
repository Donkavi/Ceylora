'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import type { LatLng } from '@/types';
import { CATEGORY_COLORS, type MapPoint } from './types';

export type BaseLayer = 'satellite' | 'map';

const TILES: Record<BaseLayer, { url: string; attribution: string; maxZoom: number }> = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics &amp; the GIS User Community',
    maxZoom: 17,
  },
  map: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18,
  },
};

export const ISLAND_CENTER: LatLng = [7.75, 80.75];
const ISLAND_BOUNDS = L.latLngBounds([5.4, 78.6], [10.3, 82.9]);

/** Where the destination should land on screen, leaving room for overlay panels. */
export interface FocusOffset {
  x: number;
  y: number;
}

interface IslandMapProps {
  points: MapPoint[];
  visible: Set<string>;
  selected: string | null;
  onSelect: (slug: string) => void;
  baseLayer: BaseLayer;
  scrollWheelZoom?: boolean;
  focusOffset: FocusOffset;
  fitKey: string;
  initialZoom: number;
  /** Optional route drawn between points (itineraries). */
  route?: LatLng[];
  compactTooltips?: boolean;
  /** Marks a point as active without moving the camera. */
  highlight?: string | null;
  /** Fit the camera to these coordinates on first render. */
  initialBounds?: LatLng[];
  /** Short badges (e.g. day numbers) shown inside markers. */
  badges?: Record<string, string>;
}

function markerIcon(point: MapPoint, index: number, badge?: string) {
  const color = CATEGORY_COLORS[point.categories[0]];
  const size = badge ? 30 : 24;
  return L.divIcon({
    className: `ceylora-marker${badge ? ' has-badge' : ''}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<span class="cm" style="--cm:${badge ? '#173D32' : color};--cm-delay:${index * 40}ms"><span class="cm-pulse"></span><span class="cm-dot">${badge ? `<span class="cm-badge">${badge}</span>` : ''}</span><span class="cm-label">${point.name.replace(' National Park', '').replace(' Forest Reserve', '')}</span></span>`,
  });
}

function DestinationMarker({
  point,
  index,
  visible,
  active,
  onSelect,
  compact,
  badge,
}: {
  point: MapPoint;
  index: number;
  visible: boolean;
  active: boolean;
  onSelect: (slug: string) => void;
  compact?: boolean;
  badge?: string;
}) {
  const ref = useRef<L.Marker>(null);
  const icon = useMemo(() => markerIcon(point, index, badge), [point, index, badge]);

  useEffect(() => {
    const el = ref.current?.getElement();
    if (!el) return;
    el.classList.toggle('is-hidden', !visible);
    el.classList.toggle('is-active', active);
    el.setAttribute('aria-hidden', visible ? 'false' : 'true');
    el.tabIndex = visible ? 0 : -1;
    ref.current?.setZIndexOffset(active ? 1000 : 0);
  }, [visible, active]);

  return (
    <Marker
      ref={ref}
      position={point.coordinates}
      icon={icon}
      keyboard
      title={point.name}
      alt={point.name}
      eventHandlers={{ click: () => visible && onSelect(point.slug) }}
    >
      {visible && !active && (
        <Tooltip direction="top" offset={[0, -16]} opacity={1} className="ceylora-tooltip">
          {compact ? (
            <div className="px-3 py-2 text-xs font-semibold text-forest">{point.name}</div>
          ) : (
            <div className="w-56">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-sized preview inside a Leaflet tooltip */}
              <img
                src={`/_next/image?url=${encodeURIComponent(point.photo.src)}&w=384&q=60`}
                alt=""
                width={224}
                height={120}
                className="h-[120px] w-full object-cover"
                style={{ objectPosition: point.photo.focus }}
              />
              <div className="px-3.5 pt-3 pb-3.5">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-tropical uppercase">{point.region}</p>
                <p className="mt-1 font-display text-xl leading-tight text-forest">{point.name}</p>
                <p className="mt-1.5 text-xs leading-snug whitespace-normal text-charcoal/70">{point.tagline}</p>
              </div>
            </div>
          )}
        </Tooltip>
      )}
    </Marker>
  );
}

/** Responds to selection and filter changes with smooth camera moves. */
function CameraDirector({
  points,
  visible,
  selected,
  focusOffset,
  fitKey,
  initialZoom,
  initialBounds,
}: Pick<IslandMapProps, 'points' | 'visible' | 'selected' | 'focusOffset' | 'fitKey' | 'initialZoom' | 'initialBounds'>) {
  const map = useMap();
  const first = useRef(true);

  useMapEvents({
    zoomend: () => map.getContainer().classList.toggle('show-labels', map.getZoom() >= 9),
  });

  const boundsKey = initialBounds?.map((c) => c.join(',')).join('|');
  useEffect(() => {
    if (!initialBounds || initialBounds.length === 0) return;
    if (initialBounds.length === 1) map.setView(initialBounds[0], 10);
    else map.fitBounds(L.latLngBounds(initialBounds), { padding: [50, 50], maxZoom: 10 });
    map.getContainer().classList.toggle('show-labels', map.getZoom() >= 9);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refit only when the coordinates change
  }, [boundsKey, map]);

  useEffect(() => {
    if (!selected) return;
    const point = points.find((p) => p.slug === selected);
    if (!point) return;
    const zoom = Math.max(map.getZoom(), 10);
    const target = map.unproject(map.project(point.coordinates, zoom).add([focusOffset.x, focusOffset.y]), zoom);
    map.flyTo(target, zoom, { duration: 1.5, easeLinearity: 0.2 });
  }, [selected, points, map, focusOffset.x, focusOffset.y]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (selected) return;
    const shown = points.filter((p) => visible.has(p.slug));
    if (shown.length === 0) return;
    if (shown.length === points.length) {
      map.flyTo(ISLAND_CENTER, initialZoom, { duration: 1.2 });
      return;
    }
    const bounds = L.latLngBounds(shown.map((p) => p.coordinates));
    map.flyToBounds(bounds, { padding: [90, 90], maxZoom: 9, duration: 1.3 });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run only when the filter changes
  }, [fitKey]);

  return null;
}

export default function IslandMap({
  points,
  visible,
  selected,
  onSelect,
  baseLayer,
  scrollWheelZoom = false,
  focusOffset,
  fitKey,
  initialZoom,
  route,
  compactTooltips,
  highlight,
  initialBounds,
  badges,
}: IslandMapProps) {
  const tiles = TILES[baseLayer];
  return (
    <MapContainer
      center={ISLAND_CENTER}
      zoom={initialZoom}
      minZoom={6.5}
      maxZoom={tiles.maxZoom}
      zoomSnap={0.5}
      maxBounds={ISLAND_BOUNDS}
      maxBoundsViscosity={0.8}
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={false}
      attributionControl
      className={`h-full w-full ${baseLayer === 'satellite' ? 'is-satellite' : 'is-map'}`}
    >
      <TileLayer key={baseLayer} url={tiles.url} attribution={tiles.attribution} maxZoom={tiles.maxZoom} detectRetina />
      {route && route.length > 1 && (
        <>
          <Polyline positions={route} pathOptions={{ color: '#173D32', weight: 6, opacity: 0.35 }} />
          <Polyline positions={route} pathOptions={{ color: '#C99D62', weight: 2.5, dashArray: '6 8', className: 'route-line' }} />
        </>
      )}
      {points.map((p, i) => (
        <DestinationMarker
          key={p.slug}
          point={p}
          index={i}
          visible={visible.has(p.slug)}
          active={selected === p.slug || highlight === p.slug}
          onSelect={onSelect}
          compact={compactTooltips}
          badge={badges?.[p.slug]}
        />
      ))}
      <CameraDirector
        points={points}
        visible={visible}
        selected={selected}
        focusOffset={focusOffset}
        fitKey={fitKey}
        initialZoom={initialZoom}
        initialBounds={initialBounds}
      />
      <ZoomButtons />
    </MapContainer>
  );
}

function ZoomButtons() {
  const map = useMap();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    L.DomEvent.disableClickPropagation(ref.current);
    L.DomEvent.disableScrollPropagation(ref.current);
  }, []);
  return (
    <div ref={ref} className="leaflet-bottom leaflet-right !mb-8 !mr-4 md:!mr-6">
      <div className="leaflet-control flex flex-col overflow-hidden rounded-full bg-ivory shadow-[0_8px_30px_rgb(15_42_34/0.25)]">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => map.zoomIn()}
          className="flex size-10 items-center justify-center text-lg text-forest hover:bg-sand"
        >
          +
        </button>
        <span className="h-px bg-sand" />
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => map.zoomOut()}
          className="flex size-10 items-center justify-center text-lg text-forest hover:bg-sand"
        >
          −
        </button>
        <span className="h-px bg-sand" />
        <button
          type="button"
          aria-label="Show the whole island"
          onClick={() => map.flyTo(ISLAND_CENTER, 7.5, { duration: 1.2 })}
          className="flex size-10 items-center justify-center text-[10px] font-semibold tracking-wider text-forest hover:bg-sand"
        >
          LK
        </button>
      </div>
    </div>
  );
}
