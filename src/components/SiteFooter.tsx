export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="font-display text-base font-semibold text-foreground">I Got Space</p>
        <p>© {new Date().getFullYear()} I Got Space. Park smarter, earn easier.</p>
      </div>
    </footer>
  );
}
