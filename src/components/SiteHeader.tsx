import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 glass border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-sunset shadow-glow">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </span>
          I Got Space
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="/#how" className="hover:text-foreground">How it works</a>
          <a href="/#providers" className="hover:text-foreground">For providers</a>
          <Link to="/map" className="hover:text-foreground">Find parking</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/map" className="hidden rounded-full border-2 border-border px-4 py-2 text-sm text-foreground transition hover:bg-surface md:inline-flex">
            Sign in
          </Link>
          <Link
            to="/map"
            className="rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            Find a spot
          </Link>
        </div>
      </div>
    </header>
  );
}
