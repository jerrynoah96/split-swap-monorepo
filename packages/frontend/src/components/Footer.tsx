import { Button } from "@/components/ui/button";
import { Github, Twitter, Globe, BookOpen, MessageCircle } from "lucide-react";
import splitswapLogo from "@/assets/splitswap-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Multiswap", href: "#swap" },
      { label: "Analytics", href: "#analytics" },
      { label: "Pricing", href: "#pricing" },
      { label: "API", href: "#api" },
    ],
    Resources: [
      { label: "Documentation", href: "#docs" },
      { label: "Tutorials", href: "#tutorials" },
      { label: "Support", href: "#support" },
      { label: "Status", href: "#status" },
    ],
    Community: [
      { label: "Discord", href: "#discord" },
      { label: "Twitter", href: "#twitter" },
      { label: "GitHub", href: "#github" },
      { label: "Blog", href: "#blog" },
    ],
    Company: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  };

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={splitswapLogo} 
                alt="SplitSwap" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SplitSwap
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The cross-chain multiswap protocol that lets you split one token into many or combine multiple tokens into one — all in a single transaction.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest updates on SplitSwap features and protocol improvements.
            </p>
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <Button variant="default" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <p>© {currentYear} SplitSwap. All rights reserved.</p>
              <span className="hidden md:inline">•</span>
              <p className="flex items-center space-x-1">
                <span>Powered by</span>
                <span className="font-semibold text-foreground">1inch</span>
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;