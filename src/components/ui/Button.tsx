import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'light' | 'outline' | 'outline-light' | 'text' | 'text-light';

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full text-[0.8125rem] font-semibold tracking-[0.08em] uppercase transition-[color,background-color,border-color,transform] duration-500 ease-[var(--ease-cinematic)] active:scale-[0.98]';

const variants: Record<Variant, string> = {
  solid: 'bg-forest px-7 py-4 text-ivory hover:bg-forest-deep',
  light: 'bg-ivory px-7 py-4 text-forest hover:bg-sand',
  outline: 'border border-forest/30 px-7 py-4 text-forest hover:border-forest hover:bg-forest hover:text-ivory',
  'outline-light': 'border border-ivory/50 px-7 py-4 text-ivory backdrop-blur-sm hover:border-ivory hover:bg-ivory hover:text-forest',
  text: 'px-0 py-1 text-forest',
  'text-light': 'px-0 py-1 text-ivory',
};

interface Props extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  icon?: boolean;
  className?: string;
  children: ReactNode;
}

export function LinkButton({ variant = 'solid', icon = true, className, children, ...rest }: Props) {
  const isText = variant === 'text' || variant === 'text-light';
  return (
    <Link className={cn(base, variants[variant], className)} {...rest}>
      <span className={cn(isText && 'link-underline')}>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </Link>
  );
}
