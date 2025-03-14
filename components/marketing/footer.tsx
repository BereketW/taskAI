import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#030303] py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <div className="h-4 w-4 rounded-full bg-gradient-to-r from-indigo-300 to-rose-300" />
              </div>
              <span className="text-lg font-semibold text-white">
                Task
                <span className="font-pacifico bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                  AI
                </span>
              </span>
            </Link>
            <p className="text-sm text-white/40">
              AI-powered task management for optimized productivity.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="font-medium text-white">Product</div>
            <nav className="grid gap-2">
              <Link
                href="/#features"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Pricing
              </Link>
              <Link
                href="/integrations"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Integrations
              </Link>
              <Link
                href="/changelog"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Changelog
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <div className="font-medium text-white">Resources</div>
            <nav className="grid gap-2">
              <Link
                href="/blog"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Blog
              </Link>
              <Link
                href="/docs"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Documentation
              </Link>
              <Link
                href="/guides"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Guides
              </Link>
              <Link
                href="/help"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Help Center
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <div className="font-medium text-white">Company</div>
            <nav className="grid gap-2">
              <Link
                href="/about"
                className="text-sm text-white/40 hover:text-white/70"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Contact
              </Link>
              <Link
                href="/careers"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Careers
              </Link>
              <Link
                href="/legal"
                className="text-sm text-white/40 hover:text-white/70"
              >
                Legal
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} TaskAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/70"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/70"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-white/40 hover:text-white/70"
            >
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
