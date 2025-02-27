import Link from "next/link"
import { CheckSquare } from "lucide-react"

export function MarketingFooter() {
  return (
    <footer className="w-full border-t bg-background py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <CheckSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">TaskAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">AI-powered task management for optimized productivity.</p>
          </div>
          <div className="grid gap-4">
            <div className="font-medium">Product</div>
            <nav className="grid gap-2">
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/integrations" className="text-sm text-muted-foreground hover:text-foreground">
                Integrations
              </Link>
              <Link href="/changelog" className="text-sm text-muted-foreground hover:text-foreground">
                Changelog
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <div className="font-medium">Resources</div>
            <nav className="grid gap-2">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
              <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground">
                Guides
              </Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <div className="font-medium">Company</div>
            <nav className="grid gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                Careers
              </Link>
              <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground">
                Legal className="text-sm text-muted-foreground hover:text-foreground"> Legal
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TaskAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

