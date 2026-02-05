import { Package, ShoppingBag, Box, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface EmptyParcelsStateProps {
  onAddParcel: () => void;
}

export function EmptyParcelsState({ onAddParcel }: EmptyParcelsStateProps) {
  const steps = [
    {
      icon: ShoppingBag,
      title: "Shop on Taobao/1688",
      desc: "Find your products and use your warehouse address",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Box,
      title: "We Receive Your Items",
      desc: "Your packages arrive at our Guangzhou warehouse",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      icon: Package,
      title: "Register Your Parcel",
      desc: "Add tracking number and we'll update you with photos",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Truck,
      title: "Ship to India",
      desc: "Select shipping method and track until delivery",
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Empty State Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl border border-dashed border-border"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-12 w-12 text-primary" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">0</span>
            </motion.div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-primary mb-2">
          Ready to start shipping?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          You haven't registered any parcels yet. Follow the steps below to get started with your first shipment from China.
        </p>

        <Button
          size="lg"
          onClick={onAddParcel}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg"
        >
          Register Your First Parcel
        </Button>
      </motion.div>

      {/* Getting Started Guide */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            How to Get Started
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className={`flex-shrink-0 h-12 w-12 rounded-lg ${step.bg} flex items-center justify-center`}>
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-muted-foreground">
                      STEP {i + 1}
                    </span>
                  </div>
                  <h5 className="font-semibold text-sm mb-1">{step.title}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-primary mb-4">💡 Pro Tips</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">•</span>
              <span>
                <strong className="text-foreground">Save on shipping:</strong> Wait for multiple items to arrive and consolidate them into one shipment
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">•</span>
              <span>
                <strong className="text-foreground">Track easily:</strong> Always use your warehouse address with C2I ID so we can identify your packages
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-0.5">•</span>
              <span>
                <strong className="text-foreground">Quality check:</strong> We inspect and photograph all items before shipping to ensure quality
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
