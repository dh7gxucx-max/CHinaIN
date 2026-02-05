import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Package, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function Calculator() {
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const PRICE_PER_KG = 15; // $15 per kg

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!isNaN(w) && w > 0) {
      setResult(w * PRICE_PER_KG);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <CalcIcon className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Shipping Cost Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate your shipping costs from China to India. Simple, transparent pricing at $15 per kilogram.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-t-4 border-t-accent">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl flex items-center justify-center gap-2 text-primary">
                <Package className="h-6 w-6 text-accent" />
                Enter Package Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="weight" className="text-lg font-semibold">
                    Package Weight (kg)
                  </Label>
                  <div className="relative">
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="Enter weight in kilograms"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="h-14 text-lg pl-12 text-center font-mono"
                    />
                    <span className="absolute left-4 top-4 text-muted-foreground text-lg font-bold">
                      KG
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Minimum weight: 0.1 kg
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                  disabled={!weight}
                >
                  Calculate Shipping Cost
                </Button>
              </form>

              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 space-y-6"
                >
                  <div className="bg-gradient-to-br from-primary to-primary/90 text-white p-8 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium opacity-90">
                        Total Shipping Cost
                      </span>
                      <DollarSign className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-5xl font-bold font-mono mb-2">
                      ${result.toFixed(2)}
                    </div>
                    <div className="text-sm opacity-75">
                      for {parseFloat(weight).toFixed(2)} kg @ $15/kg
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-6 rounded-xl border border-border">
                    <h3 className="font-semibold text-lg mb-4 text-primary">
                      Price Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Weight:</span>
                        <span className="font-mono font-semibold">
                          {parseFloat(weight).toFixed(2)} kg
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rate:</span>
                        <span className="font-mono font-semibold">$15.00/kg</span>
                      </div>
                      <div className="pt-3 border-t border-border flex justify-between items-center">
                        <span className="font-bold text-primary">Total:</span>
                        <span className="font-mono font-bold text-2xl text-primary">
                          ${result.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
                    <h4 className="font-semibold text-primary mb-2">
                      What's Included?
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span>Air freight from China to India</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span>Customs clearance and documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span>Quality inspection and packaging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span>Door-to-door delivery in India</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Need help with your shipment?
          </p>
          <a href="/api/login">
            <Button size="lg" variant="outline" className="h-12 px-8">
              Get Started Now
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
