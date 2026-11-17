import { Photo } from '@/components/ui/Photo';
import { LinkButton } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative isolate flex h-[100svh] min-h-[560px] items-end overflow-hidden bg-forest-deep text-ivory">
      <div className="absolute inset-0 -z-10">
        <Photo id="horton-plains-worlds-end" sizes="100vw" className="opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-forest-deep/30" />
      </div>
      <div className="container-x pb-20">
        <p className="eyebrow text-gold">404 · World’s End</p>
        <h1 className="display-xl mt-5 max-w-[14ch]">You’ve walked off the edge of the map.</h1>
        <p className="lede mt-6 max-w-lg text-ivory/80">
          The page you were looking for isn’t here — but the island is. Let’s find you a way back.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <LinkButton href="/" variant="light">
            Back to the beginning
          </LinkButton>
          <LinkButton href="/explore" variant="outline-light">
            Open the island map
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
