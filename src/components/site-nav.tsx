import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/accommodations", label: "Accommodations" },
  { to: "/cafe", label: "Cafe" },
  { to: "/explore", label: "Explore" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Mountain className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none font-semibold">
              Falls View Camp
            </span>
            <span className="block truncate text-[0.7rem] text-muted-foreground">
              Sergio Osmeña
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "!text-primary bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/accommodations" hash="book" className="btn-base btn-water ml-2">
            Book a Stay
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="btn-base btn-outline px-3 py-2 sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border px-4 pb-4 pt-2 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary"
              activeProps={{ className: "!text-primary bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/accommodations"
            hash="book"
            onClick={() => setOpen(false)}
            className="btn-base btn-water mt-2"
          >
            Book a Stay
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-forest-deep px-4 py-10 text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl">Falls View Camp</p>
          <p className="text-sm opacity-80">
            Sitio Falls View, Sergio Osmeña Sr., Zamboanga del Norte · Open daily 6am–9pm
          </p>
        </div>
        <p className="text-sm opacity-70">Leave no trace. Pack out what you pack in.</p>
      </div>
    </footer>
  );
}
