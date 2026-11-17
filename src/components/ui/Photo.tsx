import { getPhoto } from '@/lib/photos';
import { PhotoCreditLink, PhotoImage, type PhotoImageProps } from './PhotoImage';

type PhotoProps = Omit<PhotoImageProps, 'photo'> & { id: string };

/**
 * Server-side convenience: resolves a photo by id from the registry and renders it.
 * Client components should receive resolved photos and use <PhotoImage> instead,
 * so the registry never ships to the browser.
 */
export function Photo({ id, ...rest }: PhotoProps) {
  return <PhotoImage photo={getPhoto(id)} {...rest} />;
}

export function PhotoCredit({ id, className }: { id: string; className?: string }) {
  return <PhotoCreditLink photo={getPhoto(id)} className={className} />;
}
