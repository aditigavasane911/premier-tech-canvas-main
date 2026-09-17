import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useLayoutEffect, useRef } from "react";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className={cn(
              "inline-flex items-center gap-2 justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
            )}
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 flex justify-center text-destructive">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={cn(
              "inline-flex items-center gap-2 justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
            )}
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <a
            href="/"
            className={cn(
              "inline-flex items-center gap-2 justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
            )}
          >
            <Home className="h-4 w-4" />
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "HATAEC TECH" },
      {
        name: "description",
        content:
          "Softtech Solutions and Trainings trains students in Java, MERN, Python and Cloud with real projects, mentorship and placement support. 1200+ students trained since 2024.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Softtech Solutions and Trainings" },
      { property: "og:image", content: "/softtech-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/softtech-logo.png" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/softtech-logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/softtech-logo.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <ScrollToTopOnNavigate />
      <Outlet />
    </QueryClientProvider>
  );
}

/**
 * Deterministic "back to top" on route change.
 *
 * The global `html { scroll-behavior: smooth }` style makes *every* programmatic
 * scroll glide — including TanStack Start's scroll restoration on navigation —
 * which lands you mid-scroll and makes the next page look "cut" at the top.
 * We snap to the top instantly whenever the route PATH changes, so each page
 * opens from its true top. In-page `#anchor` links on the single-page home
 * keep their pathname unchanged, so they still glide smoothly as intended.
 */
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useLayoutEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    // `scrollTo({ behavior: "instant" })` overrides the global smooth scroll
    // for this same-tick jump, so the new page appears without a flicker.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
