import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SwapInterface from "@/components/SwapInterface";

const Swap = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-primary bg-clip-text text-transparent">
              SplitSwap Protocol
            </h1>
            <p className="text-center text-muted-foreground mb-12">
              Swap one token into multiple tokens across different chains
            </p>
            
            <SwapInterface />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Swap;