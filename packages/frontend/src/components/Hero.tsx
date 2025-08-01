import { Button } from "@/components/ui/button";
import { ArrowDown, Zap, Network, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import splitswapLogo from "@/assets/splitswap-logo.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-primary-glow/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src={splitswapLogo} 
            alt="SplitSwap" 
            className="w-24 h-24 rounded-2xl shadow-glow-primary"
          />
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
          SplitSwap
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
          Cross-Chain Multiswap Protocol
        </p>
        
        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Swap one token into multiple tokens (1→N) or combine multiple tokens into one (N→1) — 
          even across different blockchains — all in a single transaction. 
          <span className="font-bold text-primary">Built on top of 1inch.</span>
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
            <Shuffle className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Multi-Token Swaps</h3>
            <p className="text-sm text-muted-foreground text-center">Split one token into many or combine many into one</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
            <Network className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-semibold mb-2">Cross-Chain</h3>
            <p className="text-sm text-muted-foreground text-center">Execute swaps across multiple blockchains simultaneously</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
            <Zap className="w-8 h-8 text-primary-glow mb-3" />
            <h3 className="font-semibold mb-2">Single Transaction</h3>
            <p className="text-sm text-muted-foreground text-center">No more manual bridging or multiple swap steps</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button variant="hero" size="lg" className="px-8 py-4 text-lg" onClick={() => navigate('/swap')}>
          Start Swapping
          <ArrowDown className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </div>
  );
};

export default Hero;