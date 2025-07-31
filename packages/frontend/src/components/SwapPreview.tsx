import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings, Info } from "lucide-react";

const SwapPreview = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Start Your Multiswap</h2>
        <p className="text-muted-foreground">
          Ready to experience seamless cross-chain token splitting? The interface is coming soon.
        </p>
      </div>

      {/* Preview Card - This will be replaced in future steps */}
      <Card className="p-8 bg-gradient-accent border-border shadow-glow-primary/20">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Multiswap Interface</h3>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Preview Content */}
          <div className="space-y-4">
            <div className="p-4 bg-card/50 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-semibold">Select Token</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="font-semibold">--</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-2 bg-primary/20 rounded-full">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="space-y-3">
              {/* First token split */}
              <div className="p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Split 1 • Base</p>
                    <p className="font-semibold text-primary group-hover:text-primary-glow transition-colors">40% → USDC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Est. Value</p>
                    <p className="font-semibold">$400.00</p>
                  </div>
                </div>
              </div>

              {/* Second token split */}
              <div className="p-4 bg-card/50 rounded-lg border border-border/50 hover:border-secondary/30 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Split 2 • Sonic</p>
                    <p className="font-semibold text-secondary group-hover:text-secondary transition-colors">30% → wBTC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Est. Value</p>
                    <p className="font-semibold">$300.00</p>
                  </div>
                </div>
              </div>

              {/* Third token split */}
              <div className="p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Split 3 • Arbitrum</p>
                    <p className="font-semibold text-primary group-hover:text-primary-glow transition-colors">30% → MATIC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Est. Value</p>
                    <p className="font-semibold">$300.00</p>
                  </div>
                </div>
              </div>

              {/* Add new split button */}
              <div className="p-4 bg-muted/30 rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 transition-all duration-200 cursor-pointer group">
                <div className="flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/30 transition-colors">
                      <span className="text-lg font-bold">+</span>
                    </div>
                    <p className="text-sm font-medium">Add Another Split</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
              <Info className="w-4 h-4 text-primary" />
              <p className="text-sm text-muted-foreground">
                Cross-chain swaps powered by 1inch
              </p>
            </div>

            <Button variant="default" className="w-full" disabled>
              Configure Swap
            </Button>
          </div>
        </div>
      </Card>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          🚧 Interface coming in the next steps! This is just Step 1: Foundation & Design
        </p>
      </div>
    </div>
  );
};

export default SwapPreview;