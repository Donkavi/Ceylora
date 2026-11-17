import Image, { type ImageProps } from 'next/image';
import type { Photo } from '@/types';
import { cn } from '@/lib/utils';

export type PhotoImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'placeholder' | 'blurDataURL'> & {
  photo: Photo;
  alt?: string;
  /** Render with intrinsic dimensions instead of filling the parent. */
  intrinsic?: boolean;
  /** Show the blurred preview while loading (default true). */
  blur?: boolean;
};

/**
 * Presentational image for a resolved photo — safe to use in client components
 * because it never imports the photo registry. Defaults to `fill`.
 */
export function PhotoImage({ photo, alt, intrinsic, blur = true, className, style, sizes = '100vw', quality = 75, ...rest }: PhotoImageProps) {
  const common = {
    src: photo.src,
    alt: alt ?? photo.alt,
    ...(blur ? { placeholder: 'blur' as const, blurDataURL: photo.blur } : {}),
    sizes,
    quality,
    style: { objectPosition: photo.focus, ...style },
    ...rest,
  };

  if (intrinsic) {
    return <Image {...common} width={photo.width} height={photo.height} className={className} />;
  }
  return <Image {...common} fill className={cn('object-cover', className)} />;
}

export function PhotoCreditLink({ photo, className }: { photo: Photo; className?: string }) {
  if (!photo.credit.source) return null;
  return (
    <a
      href={photo.credit.source}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('text-[10px] tracking-wide opacity-70 transition-opacity hover:opacity-100', className)}
    >
      Photo: {photo.credit.author} · {photo.credit.license}
    </a>
  );
}
