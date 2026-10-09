import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StudioWordmark } from "@/components/brand/StudioWordmark";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Auto", href: "/auto" },
  { label: "Command Centre", href: "/command-centre" },
  { label: "Documents", href: "/documents" },
  { label: "Socials", href: "/socials" },
  { label: "Your store", href: "/your-store" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Pricing", href: "/#pricing", isAnchor: true },
  { label: "Blog", href: "/blog" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (link: typeof navLinks[0]) => !link.isAnchor && location.pathname === link.href;

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.isAnchor) {
      e.preventDefault();
      const hash = link.href.replace("/", "");
      if (location.pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/" + hash);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Automatos Studio home">
            <StudioWordmark />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={(e) => handleNavClick(link, e)}
                aria-current={isActive(link) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap border-b-[1.5px] py-1 text-sm font-medium transition-colors hover:text-foreground",
                  isActive(link) ? "border-accent text-foreground" : "border-transparent text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <ModeToggle />
            <Link to="/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                Sign in
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <ModeToggle />
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={(e) => { handleNavClick(link, e); setIsOpen(false); }}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-4">
                  Sign in
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
