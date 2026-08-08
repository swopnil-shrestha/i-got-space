import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Search, Bike, Car, ShieldCheck, Sparkles, Wallet, Clock, Star, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroMap from "@/assets/hero-map.jpg";
import driveway from "@/assets/driveway.jpg";
import garage from "@/assets/garage.jpg";
import rooftop from "@/assets/rooftop.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I Got Space — Find & rent parking spots near you" },
      { name: "description", content: "Discover, reserve and pay for parking in seconds. Or list your unused driveway, lot or garage and earn." },
      { property: "og:title", content: "I Got Space — Park smarter, earn easier" },
      { property: "og:description", content: "A parking marketplace that connects drivers with people who have a space to share." },
      { property: "og:image", content: heroMap },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <BentoShowcase />
      <HowItWorks />
      <ProvidersBand />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-14 md:grid-cols-[1.05fr_1fr] md:pt-20">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-border bg-surface px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-secondary" /> New • now in Kathmandu
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-foreground md:text-7xl">
            Every empty spot,<br />
            <span className="text-sunset">a parking spot.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            I Got Space turns driveways, lots and garages into bookable parking.
            Find a guaranteed spot in seconds — or earn from the one you already own.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full glass p-2 shadow-soft"
          >
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Where do you need to park?"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Link
              to="/map"
              className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
            >
              Search <ArrowRight className="h-4 w-4" />
            </Link>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Stat value="12k+" label="spots listed" />
            <Stat value="4.8★" label="avg. rating" />
            <Stat value="60 sec" label="to book" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-blue" />
          <div className="overflow-hidden rounded-[2rem] border-2 border-border shadow-glow">
            <img
              src={heroMap}
              alt="Map of available parking spots glowing across a city at sunset"
              width={1536}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <FloatingCard className="left-4 top-6" />
          <FloatingPrice className="-bottom-4 right-4" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-xl font-semibold text-foreground">{value}</div>
      <div className="text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}

function FloatingCard({ className = "" }) {
  return (
    <div className={`absolute hidden w-64 rounded-2xl glass p-4 shadow-soft md:block ${className}`}>
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-ember-gradient">
          <MapPin className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold">Pulchowk Driveway</p>
          <p className="text-xs text-muted-foreground">0.4 km • 2 of 3 free</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="rounded-full bg-primary px-2 py-1 text-secondary">Available now</span>
        <span className="text-muted-foreground">$1.5/hr</span>
      </div>
    </div>
  );
}

function FloatingPrice({ className = "" }) {
  return (
    <div className={`absolute hidden rounded-2xl glass px-5 py-4 shadow-soft md:block ${className}`}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">You earned</p>
      <p className="font-display text-2xl font-bold text-sunset">+ $142.30</p>
      <p className="text-xs text-muted-foreground">this week</p>
    </div>
  );
}

function BentoShowcase() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-secondary">What's inside</p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            A whole parking city in your pocket.
          </h2>
        </div>
        <Link to="/map" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
          Open the map →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[200px_200px_220px]">
        {/* Live map tile */}
        <Link
          to="/map"
          className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl border-2 border-border md:col-span-3 md:row-span-2"
        >
          <img src={heroMap} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" width={1536} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs text-secondary">Live map</span>
            <h3 className="mt-2 font-display text-2xl font-semibold">See available spots in real time</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">Markers update the moment a space is booked, freed or blocked.</p>
          </div>
        </Link>

        {/* Vehicle filter */}
        <div className="col-span-1 row-span-1 rounded-3xl glass p-6 md:col-span-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-secondary"><Car className="h-5 w-5" /></span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20 text-accent"><Bike className="h-5 w-5" /></span>
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold">Cars or bikes — filter by what you ride.</h3>
          <p className="mt-1 text-sm text-muted-foreground">Only see spots that actually fit your vehicle, price and distance.</p>
        </div>

        {/* Booking */}
        <div className="col-span-1 row-span-1 rounded-3xl border-2 border-border bg-surface p-6 md:col-span-2">
          <Clock className="h-6 w-6 text-secondary" />
          <h3 className="mt-4 font-display text-xl font-semibold">Book in 60 seconds.</h3>
          <p className="mt-1 text-sm text-muted-foreground">Pick a time, pay securely, drive in. No more circling the block.</p>
        </div>

        {/* Earnings */}
        <div className="col-span-1 row-span-1 rounded-3xl bg-sunset p-6 text-primary-foreground shadow-glow md:col-span-1">
          <Wallet className="h-6 w-6" />
          <p className="mt-4 text-sm/relaxed opacity-90">Avg. provider earns</p>
          <p className="font-display text-3xl font-bold">$320/mo</p>
        </div>

        {/* Trust */}
        <div className="col-span-1 row-span-1 rounded-3xl glass p-6 md:col-span-3">
          <ShieldCheck className="h-6 w-6 text-accent" />
          <h3 className="mt-4 font-display text-xl font-semibold">Verified hosts. CCTV-ready. Insurance built-in.</h3>
          <p className="mt-1 text-sm text-muted-foreground">Every listing is reviewed and rated. Park with confidence, every time.</p>
        </div>

        {/* Reviews */}
        <div className="col-span-1 row-span-1 rounded-3xl border-2 border-border bg-surface p-6 md:col-span-3">
          <div className="flex items-center gap-1 text-secondary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-3 text-sm italic text-muted-foreground">
            "Found a spot 50m from my meeting in under a minute. This is the parking app I've been waiting for."
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Anish — daily commuter</p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Search nearby", desc: "Open the map and see every available spot around you, filtered by your vehicle." },
    { n: "02", title: "Reserve & pay", desc: "Lock in your time slot in a tap. Pay with card, wallet or local methods." },
    { n: "03", title: "Drive in, park, go", desc: "Navigate straight to the spot. Extend your time from the app if you need." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="font-display text-4xl font-bold md:text-5xl">Three steps. Zero stress.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-3xl border-2 border-border bg-surface p-8 transition hover:border-primary/50">
            <span className="font-display text-sm text-secondary">{s.n}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProvidersBand() {
  return (
    <section id="providers" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 rounded-[2rem] border-2 border-border bg-surface p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="text-sm uppercase tracking-widest text-accent">For space providers</p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            That empty driveway? <span className="text-sunset">It's a side income.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            List your spot in minutes. Set your price and hours. Accept or auto-confirm bookings.
            We handle payments, payouts and dispute support.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Pin your location & upload photos",
              "Set hourly, daily or monthly pricing",
              "Block dates or hours anytime",
              "Get paid weekly to your bank",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-secondary">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
          >
            Become a host <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img src={driveway} alt="Driveway" loading="lazy" width={1024} height={768} className="h-44 w-full rounded-2xl object-cover md:h-full" />
          <div className="grid gap-3">
            <img src={garage} alt="Garage" loading="lazy" width={1024} height={768} className="h-32 w-full rounded-2xl object-cover md:h-1/2" />
            <img src={rooftop} alt="Rooftop" loading="lazy" width={1024} height={768} className="h-32 w-full rounded-2xl object-cover md:h-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-sunset px-8 py-16 text-center text-primary-foreground shadow-glow md:px-16">
        <div className="absolute inset-0 -z-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)" }} />
        <h2 className="relative font-display text-4xl font-bold md:text-6xl">Ready to never circle the block again?</h2>
        <p className="relative mx-auto mt-4 max-w-xl opacity-90">Open the live map and grab a guaranteed spot near you.</p>
        <Link
          to="/map"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 font-semibold text-foreground transition hover:opacity-90"
        >
          Find parking now <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
