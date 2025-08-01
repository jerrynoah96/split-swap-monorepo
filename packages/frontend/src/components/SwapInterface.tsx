import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, ArrowDown, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount, useSendTransaction, useBalance } from "wagmi";
import { parseUnits, formatUnits } from "viem";

interface Split {
  id: string;
  token: string;
  chain: string;
  percentage: string;
}

interface Token {
  address: string;
  symbol: string;
  name: string;
  logoURI: string;
  decimals: number;
}

const SwapInterface = () => {
  const { toast } = useToast();
  const [sourceTokenAddress, setSourceTokenAddress] = useState("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"); // Default to native token (ETH)
  const [sourceChain, setSourceChain] = useState("1"); // Default to Ethereum
  const [sourceAmount, setSourceAmount] = useState("1.0");
  const [splits, setSplits] = useState<Split[]>([
    { id: "1", token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", chain: "base", percentage: "40" }, // Default to USDC
    { id: "2", token: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", chain: "sonic", percentage: "30" }, // Default to wBTC
    { id: "3", token: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", chain: "arbitrum", percentage: "30" } // Default to MATIC
  ]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [quotes, setQuotes] = useState<Record<string, any>>({});
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: sourceTokenAddress === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ? undefined : sourceTokenAddress as `0x${string}`,
  });
  const { sendTransaction } = useSendTransaction();

  const sourceToken = useMemo(() => tokens.find(t => t.address === sourceTokenAddress), [tokens, sourceTokenAddress]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tokens?chainId=${sourceChain}`);
        const data = await response.json();
        if (data.tokens) {
          const tokenList = Object.values(data.tokens);
          setTokens(tokenList as Token[]);
        }
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };

    fetchTokens();
  }, [sourceChain]);

  useEffect(() => {
    const getQuotes = async () => {
      if (!sourceToken || !splits.length || !sourceAmount || parseFloat(sourceAmount) <= 0) {
        setQuotes({});
        return;
      }

      const quotePromises = splits.map(async (split) => {
        if (!split.token || !split.percentage || parseFloat(split.percentage) <= 0) {
          return { id: split.id, quote: null };
        }

        const amountForSplit = (parseFloat(sourceAmount) * (parseFloat(split.percentage) / 100));
        const amountInSmallestUnit = parseUnits(amountForSplit.toString(), sourceToken.decimals);

        try {
          const response = await fetch(
            `http://localhost:3001/quote?src=${sourceTokenAddress}&dst=${split.token}&amount=${amountInSmallestUnit.toString()}&chainId=${sourceChain}`
          );
          const data = await response.json();
          if (response.ok) {
            return { id: split.id, quote: data };
          } else {
            console.error(`Failed to get quote for split ${split.id}:`, data);
            return { id: split.id, quote: null };
          }
        } catch (error) {
          console.error(`Failed to get quote for split ${split.id}:`, error);
          return { id: split.id, quote: null };
        }
      });

      const results = await Promise.all(quotePromises);
      const newQuotes = results.reduce((acc, result) => {
        if (result) {
          acc[result.id] = result.quote;
        }
        return acc;
      }, {} as Record<string, any>);
      setQuotes(newQuotes);
    };

    const debounceTimer = setTimeout(() => {
      getQuotes();
    }, 500); // Debounce to avoid excessive API calls

    return () => clearTimeout(debounceTimer);
  }, [sourceToken, sourceTokenAddress, sourceChain, sourceAmount, splits]);

  const chains = [
    { id: "1", name: "Ethereum", color: "bg-blue-500" },
    { id: "8453", name: "Base", color: "bg-blue-600" },
    { id: "1337", name: "Sonic", color: "bg-purple-500" }, // Replace with actual chainId if available
    { id: "42161", name: "Arbitrum", color: "bg-orange-500" },
    { id: "137", name: "Polygon", color: "bg-purple-600" },
    { id: "43114", name: "Avalanche", color: "bg-red-500" }
  ];

  const addSplit = () => {
    const newSplit: Split = {
      id: Date.now().toString(),
      token: "USDC",
      chain: "ethereum",
      percentage: "0",
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

  const totalEstimatedGas = useMemo(() => {
    return Object.values(quotes).reduce((sum, quote) => sum + (quote ? Number(quote.estimatedGas) : 0), 0);
  }, [quotes]);

  const executeSwap = async () => {
    if (totalPercentage !== 100) {
      toast({
        title: "Invalid Split",
        description: "Total percentage must equal 100%",
        variant: "destructive"
      });
      return;
    }
    if (!address || !sourceToken) {
        toast({
            title: "Error",
            description: "Please connect your wallet and select a token.",
            variant: "destructive",
        });
        return;
    }

    try {
      // For simplicity, we'll use the first split for the swap data
      const firstSplit = splits[0];
      const amountInSmallestUnit = parseUnits(sourceAmount, sourceToken.decimals);

      const response = await fetch(
        `http://localhost:3001/swap?src=${sourceTokenAddress}&dst=${firstSplit.token}&amount=${amountInSmallestUnit.toString()}&from=${address}&slippage=1&chainId=${sourceChain}`
      );
      const swapData = await response.json();

      if (response.ok) {
        sendTransaction({
            to: swapData.tx.to,
            data: swapData.tx.data,
            value: BigInt(swapData.tx.value),
        });
        toast({
          title: "Swap Initiated",
          description: "Your multi-chain swap is being processed...",
        });
      } else {
        toast({
          title: "Error",
          description: swapData.error || "Failed to get swap data.",
          variant: "destructive",
        });
      }
    } catch (error) {
        console.error("Failed to execute swap:", error);
        toast({
            title: "Error",
            description: "Failed to execute swap.",
            variant: "destructive",
        });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Main Swap Container */}
      <div className="bg-card border border-border rounded-2xl p-4 space-y-1">
        
        {/* From Section */}
        <div className="p-4 bg-muted/50 rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-sm text-muted-foreground">
              Balance: {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`: "Loading..."}
            </span>
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
              
              <Select value={sourceTokenAddress} onValueChange={setSourceTokenAddress}>
                <SelectTrigger className="border-0 bg-background h-10 px-3 min-w-20">
                  <SelectValue placeholder="Select Token" />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  {tokens.map(token => (
                    <SelectItem key={token.address} value={token.address}>
                      <div className="flex items-center justify-between w-full">
                        <span>{token.symbol}</span>
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
                      <SelectValue placeholder="Select Token" />
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      {tokens.map(token => (
                        <SelectItem key={token.address} value={token.symbol}>
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
                ≈ {quotes[split.id] && quotes[split.id].toToken ? `${formatUnits(quotes[split.id].toTokenAmount, quotes[split.id].toToken.decimals)} ${quotes[split.id].toToken.symbol}` : "0.00"}
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
          <span>{totalEstimatedGas > 0 ? `${totalEstimatedGas} units` : "$0.00"}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Total Value:</span>
          <span>~$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default SwapInterface;