import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import fallsviewImage from "../assets/02_fallsview.jpg";

const links = [
  { href: "/", label: "Home" },
  { href: "/#accommodations", label: "Accommodations" },
  { href: "/#cafe", label: "Cafe" },
  { href: "/#explore", label: "Explore" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-primary text-primary-foreground">
            <img src={fallsviewImage} alt="" className="h-full w-full object-cover" />
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
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/"
            hash="book"
            className="btn-base btn-water ml-2 transition-transform hover:-translate-y-0.5"
          >
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
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/"
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
          <p className="text-sm opacity-80">Brgy. Tinindugan Sergio Osmena,Zamboanga Del Norte.</p>
        </div>
        <p className="text-sm opacity-70">Leave no trace. Pack out what you pack in.</p>
      </div>
    </footer>
  );
}
