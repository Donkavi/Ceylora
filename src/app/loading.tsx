export default function Loading() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ivory" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-5">
        <span className="font-display text-3xl italic text-forest">Ceylora</span>
        <span className="relative block h-px w-24 overflow-hidden bg-forest/15">
          <span className="absolute inset-y-0 left-0 w-1/2 animate-[loading-bar_1.4s_ease-in-out_infinite] bg-gold" />
        </span>
        <span className="sr-only">Loading</span>
      </div>
      <style>{`@keyframes loading-bar{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
    </div>
  );
}
