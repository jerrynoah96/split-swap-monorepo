import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ArrowDown, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Split {
  id: string;
  token: string;
  chain: string;
  percentage: string;
  amount: string;
}

const SwapInterface = () => {
  const { toast } = useToast();
  const [sourceToken, setSourceToken] = useState("ETH");
  const [sourceChain, setSourceChain] = useState("ethereum");
  const [sourceAmount, setSourceAmount] = useState("1.0");
  const [splits, setSplits] = useState<Split[]>([
    { id: "1", token: "USDC", chain: "base", percentage: "40", amount: "800" },
    { id: "2", token: "wBTC", chain: "sonic", percentage: "30", amount: "600" },
    { id: "3", token: "MATIC", chain: "arbitrum", percentage: "30", amount: "600" }
  ]);

  const tokens = [
    { symbol: "ETH", name: "Ethereum", price: "$2000" },
    { symbol: "USDC", name: "USD Coin", price: "$1.00" },
    { symbol: "wBTC", name: "Wrapped Bitcoin", price: "$42000" },
    { symbol: "MATIC", name: "Polygon", price: "$0.85" },
    { symbol: "AVAX", name: "Avalanche", price: "$35" },
    { symbol: "SOL", name: "Solana", price: "$95" }
  ];

  const chains = [
    { id: "ethereum", name: "Ethereum", color: "bg-blue-500" },
    { id: "base", name: "Base", color: "bg-blue-600" },
    { id: "sonic", name: "Sonic", color: "bg-purple-500" },
    { id: "arbitrum", name: "Arbitrum", color: "bg-orange-500" },
    { id: "polygon", name: "Polygon", color: "bg-purple-600" },
    { id: "avalanche", name: "Avalanche", color: "bg-red-500" }
  ];

  const addSplit = () => {
    const newSplit: Split = {
      id: Date.now().toString(),
      token: "USDC",
      chain: "ethereum",
      percentage: "0",
      amount: "0"
    };
    setSplits([...splits, newSplit]);
  };

  const removeSplit = (id: string) => {
    setSplits(splits.filter(split => split.id !== id));
  };

  const updateSplit = (id: string, field: keyof Split, value: string) => {
    setSplits(splits.map(split => 
      split.id === id ? { ...split, [field]: value } : split
    ));
  };

  const totalPercentage = splits.reduce((sum, split) => sum + (parseFloat(split.percentage) || 0), 0);

  const executeSwap = () => {
    if (totalPercentage !== 100) {
      toast({
        title: "Invalid Split",
        description: "Total percentage must equal 100%",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Swap Initiated",
      description: "Your multi-chain swap is being processed...",
    });
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Main Swap Container */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-1">
        
        {/* From Section */}
        <div className="p-4 bg-muted/50 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-sm text-muted-foreground">Balance: 5.2</span>
          </div>
          
          <div className="flex justify-between items-center">
            <Input
              value={sourceAmount}
              onChange={(e) => setSourceAmount(e.target.value)}
              placeholder="0.0"
              className="text-2xl font-medium border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-1/2"
            />
            
            <div className="flex items-center space-x-2">
              <Select value={sourceChain} onValueChange={setSourceChain}>
                <SelectTrigger className="border-0 bg-background/80 h-10 px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  {chains.map(chain => (
                    <SelectItem key={chain.id} value={chain.id}>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${chain.color} mr-2`}></div>
                        {chain.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sourceToken} onValueChange={setSourceToken}>
                <SelectTrigger className="border-0 bg-background h-10 px-3 min-w-20">
                  <SelectValue />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  {tokens.map(token => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center justify-between w-full">
                        <span>{token.symbol}</span>
                        <span className="text-muted-foreground ml-2 text-xs">{token.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-2">
          <div className="p-1 rounded-lg border border-border bg-background">
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* To Section - Splits */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-4 pt-2">
            <span className="text-sm text-muted-foreground">
              To ({splits.length} splits)
            </span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm px-2 py-1 rounded ${totalPercentage === 100 ? 'text-green-600 bg-green-100 dark:bg-green-900/20' : 'text-red-600 bg-red-100 dark:bg-red-900/20'}`}>
                {totalPercentage}%
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={addSplit}
                className="h-6 w-6 p-0 rounded-full"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {splits.map((split) => (
            <div key={split.id} className="p-4 bg-muted/50 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <Input
                  value={split.percentage}
                  onChange={(e) => updateSplit(split.id, 'percentage', e.target.value)}
                  placeholder="0"
                  className="text-lg font-medium border-0 bg-transparent p-0 h-auto focus-visible:ring-0 w-16"
                />
                <span className="text-lg">%</span>
                
                <div className="flex items-center space-x-2">
                  <Select value={split.chain} onValueChange={(value) => updateSplit(split.id, 'chain', value)}>
                    <SelectTrigger className="border-0 bg-background/80 h-8 px-2 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      {chains.map(chain => (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${chain.color} mr-2`}></div>
                            {chain.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={split.token} onValueChange={(value) => updateSplit(split.id, 'token', value)}>
                    <SelectTrigger className="border-0 bg-background h-8 px-2 min-w-16">
                      <SelectValue />
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      {tokens.map(token => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {splits.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSplit(split.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                ≈ {split.amount} {split.token}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swap Button */}
      <Button 
        onClick={executeSwap}
        size="lg" 
        className="w-full mt-4 h-14 text-lg rounded-2xl bg-gradient-primary hover:opacity-90"
        disabled={totalPercentage !== 100}
      >
        {totalPercentage !== 100 ? `Total must be 100% (${totalPercentage}%)` : 'Execute Split Swap'}
      </Button>

      {/* Summary */}
      <div className="mt-4 p-4 bg-muted/30 rounded-xl text-sm text-muted-foreground">
        <div className="flex justify-between">
          <span>Est. Gas:</span>
          <span>~$12.50</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Total Value:</span>
          <span>~$2,000 USD</span>
        </div>
      </div>
    </div>
  );
};

export default SwapInterface;