import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Loader2, Plane } from "lucide-react";

export function Calculator() {
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<{ freight: number; customs: number; commission: number; total: number } | null>(null);

  const calculateMutation = useMutation({
    mutationFn: async (w: number) => {
      const res = await fetch(api.calculator.calculate.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight: w }),
      });
      if (!res.ok) throw new Error("Calculation failed");
      return api.calculator.calculate.responses[200].parse(await res.json());
    },
    onSuccess: (data) => setResult(data),
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!isNaN(w) && w > 0) {
      calculateMutation.mutate(w);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-xl border-t-4 border-t-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <CalcIcon className="h-5 w-5 text-accent" />
          Shipping Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Parcel Weight (kg)</Label>
            <div className="relative">
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="e.g. 2.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="pl-10"
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-bold">KG</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={calculateMutation.isPending || !weight}
          >
            {calculateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Calculate Cost"}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-3 bg-secondary/50 p-4 rounded-lg border border-border animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Freight:</span>
              <span className="font-mono">₹{result.freight}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Customs Duty:</span>
              <span className="font-mono">₹{result.customs}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee:</span>
              <span className="font-mono">₹{result.commission}</span>
            </div>
            <div className="pt-2 border-t flex justify-between font-bold text-lg text-primary">
              <span>Total Est.</span>
              <span>₹{result.total}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
