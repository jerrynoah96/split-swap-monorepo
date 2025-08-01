import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import splitswapLogo from "@/assets/splitswap-logo.jpg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Swap", href: "#swap" },
    { label: "Analytics", href: "#analytics" },
    { label: "Docs", href: "#docs" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={splitswapLogo} 
              alt="SplitSwap" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SplitSwap
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="glass" size="sm" onClick={() => navigate('/swap')}>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4">
                <Button variant="glass" size="sm" className="w-full" onClick={() => navigate('/swap')}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;