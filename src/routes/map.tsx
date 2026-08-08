import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bike, Car, MapPin, Search, Star, ShieldCheck, Zap, ArrowRight, Navigation } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { spots, type Spot } from "@/data/spots";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Find parking near you — I Got Space" },
      { name: "description", content: "Browse available parking spots on a live map. Filter by vehicle, price and distance." },
    ],
  }),
  component: MapPage,
});

type VehicleFilter = "all" | "car" | "bike";

function MapPage() {
  const [query, setQuery] = useState("");
  const [vehicle, setVehicle] = useState<VehicleFilter>("all");
  const [maxPrice, setMaxPrice] = useState(5);
  const [maxDistance, setMaxDistance] = useState(10);
  const [selected, setSelected] = useState<Spot | null>(spots[0]);

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      if (vehicle !== "all" && !s.vehicles.includes(vehicle)) return false;
      if (s.pricePerHour > maxPrice) return false;
      if (s.distanceKm > maxDistance) return false;
      if (query && !`${s.name} ${s.address}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, vehicle, maxPrice, maxDistance]);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[380px_1fr]">
        {/* Sidebar: filters + list */}
        <aside className="space-y-4">
          <div className="rounded-2xl glass p-4 shadow-soft">
            <div className="flex items-center gap-2 rounded-full border-2 border-border bg-background/40 px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search location"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="mt-4 flex gap-2">
              {([
                { v: "all", label: "All", icon: null },
                { v: "car", label: "Car", icon: Car },
                { v: "bike", label: "Bike", icon: Bike },
              ] as const).map((opt) => {
                const active = vehicle === opt.v;
                return (
                  <button
                    key={opt.v}
                    onClick={() => setVehicle(opt.v)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                      active
                        ? "border-transparent bg-sunset text-primary-foreground shadow-glow"
                        : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.icon ? <opt.icon className="h-4 w-4" /> : null}
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <Range label={`Max price`} value={`$${maxPrice}/hr`}>
                <input type="range" min={1} max={5} step={0.5} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[var(--primary)]" />
              </Range>
              <Range label="Max distance" value={`${maxDistance} km`}>
                <input type="range" min={1} max={10} value={maxDistance} onChange={(e) => setMaxDistance(+e.target.value)} className="w-full accent-[var(--primary)]" />
              </Range>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-sm text-muted-foreground">
            <span>{filtered.length} spots</span>
            <Link to="/" className="hover:text-foreground">← Back home</Link>
          </div>

          <div className="space-y-3">
            {filtered.map((s) => (
              <SpotCard key={s.id} spot={s} active={selected?.id === s.id} onClick={() => setSelected(s)} />
            ))}
            {filtered.length === 0 && (
              <div className="rounded-2xl border-2 border-border bg-surface/60 p-6 text-center text-sm text-muted-foreground">
                No spots match these filters. Try widening your search.
              </div>
            )}
          </div>
        </aside>

        {/* Map */}
        <section className="relative h-[calc(100vh-7rem)] min-h-[520px] overflow-hidden rounded-3xl border-2 border-border shadow-soft">
          <MockMap spots={filtered} selected={selected} onSelect={setSelected} />
          {selected && <DetailSheet spot={selected} onClose={() => setSelected(null)} />}
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}

function Range({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-foreground">{value}</span>
      </div>
      {children}
    </label>
  );
}

function SpotCard({ spot, active, onClick }: { spot: Spot; active: boolean; onClick: () => void }) {
  const status = spot.available === 0 ? "Full" : spot.available <= 2 ? "Limited" : "Available";
  const statusColor =
    spot.available === 0
      ? "bg-destructive text-destructive-foreground"
      : spot.available <= 2
        ? "bg-primary text-primary-foreground"
        : "bg-accent text-accent-foreground";

  return (
    <button
      onClick={onClick}
      className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition ${
        active ? "border-primary bg-surface shadow-glow" : "border-border bg-surface/60 hover:border-primary/50"
      }`}
    >
      <img src={spot.image} alt={spot.name} loading="lazy" className="h-20 w-20 flex-none rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate font-display font-semibold">{spot.name}</p>
          <span className="flex items-center gap-1 text-xs text-primary">
            <Star className="h-3 w-3 fill-current" />
            {spot.rating}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{spot.address}</p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 ${statusColor}`}>{status}</span>
          <span className="text-muted-foreground">{spot.distanceKm} km</span>
          <span className="ml-auto font-display font-semibold text-foreground">${spot.pricePerHour}/hr</span>
        </div>
      </div>
    </button>
  );
}

function MockMap({ spots, selected, onSelect }: { spots: Spot[]; selected: Spot | null; onSelect: (s: Spot) => void }) {
  return (
    <div className="relative h-full w-full">
      {/* Map base */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--surface-2)" }}
      />
      {/* Streets pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="oklch(0.16 0 0 / 0.18)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path d="M0,70%  Q40%,40% 100%,55%" stroke="var(--magenta)" strokeWidth="10" fill="none" />
        <path d="M20%,0 Q40%,60% 30%,100%" stroke="var(--primary)" strokeWidth="10" fill="none" />
      </svg>


      {/* You-are-here */}
      <div className="absolute" style={{ left: "50%", top: "55%" }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-violet/40" />
          <span className="block h-4 w-4 rounded-full border-2 border-background bg-violet" />
        </div>
      </div>

      {/* Markers */}
      {spots.map((s) => {
        const color =
          s.available === 0 ? "bg-destructive" : s.available <= 2 ? "bg-accent" : "bg-sunset";
        const isSel = selected?.id === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-full"
          >
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition ${color} ${
                isSel ? "scale-110 ring-2 ring-background" : "group-hover:scale-105"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              ${s.pricePerHour}
            </span>
            <span className={`mx-auto block h-2 w-2 -translate-y-0.5 rotate-45 ${color}`} />
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute left-4 top-4 flex gap-2 rounded-full glass px-3 py-2 text-xs">
        <Legend dot="bg-sunset" label="Available" />
        <Legend dot="bg-accent" label="Limited" />
        <Legend dot="bg-destructive" label="Full" />
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function DetailSheet({ spot, onClose }: { spot: Spot; onClose: () => void }) {
  return (
    <div className="absolute bottom-4 left-4 right-4 max-w-md rounded-3xl glass p-5 shadow-glow md:left-auto md:right-4 md:w-96">
      <div className="flex items-start gap-3">
        <img src={spot.image} alt={spot.name} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-display text-lg font-semibold">{spot.name}</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">✕</button>
          </div>
          <p className="truncate text-xs text-muted-foreground">{spot.address}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-primary"><Star className="h-3 w-3 fill-current" />{spot.rating}</span>
            <span>{spot.distanceKm} km away</span>
            <span>{spot.available}/{spot.total} free</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {spot.vehicles.map((v) => (
          <span key={v} className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-primary">
            {v === "car" ? <Car className="h-3 w-3" /> : <Bike className="h-3 w-3" />} {v}
          </span>
        ))}
        {spot.amenities.map((a) => (
          <span key={a} className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-1 text-muted-foreground">
            {a === "CCTV" ? <ShieldCheck className="h-3 w-3" /> : a === "EV charging" ? <Zap className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
            {a}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">From</p>
          <p className="font-display text-2xl font-bold text-sunset">${spot.pricePerHour}<span className="text-sm text-muted-foreground">/hr</span></p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1 rounded-full border-2 border-border px-3 py-2 text-sm hover:bg-surface">
            <Navigation className="h-4 w-4" /> Directions
          </button>
          <button
            disabled={spot.available === 0}
            className="inline-flex items-center gap-1 rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reserve <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
