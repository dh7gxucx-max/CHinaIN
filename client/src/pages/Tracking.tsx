import { useParcels, useInitiateVoiceVerification } from "@/hooks/use-parcels";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, PhoneCall, Mic, CheckCircle2, Package, Truck, Plane, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Tracking() {
  const { user } = useAuth();
  const { data: parcels, isLoading } = useParcels();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const highlightedId = searchParams.get("id");

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-display font-bold text-primary mb-8">My Parcels</h1>
      
      <div className="grid gap-8">
        {parcels?.map((parcel) => (
          <TrackingCard 
            key={parcel.id} 
            parcel={parcel} 
            isHighlighted={String(parcel.id) === highlightedId}
          />
        ))}

        {!parcels?.length && (
          <div className="text-center py-20 text-muted-foreground">
            No parcels found. Add one in the Dashboard.
          </div>
        )}
      </div>
    </div>
  );
}

function TrackingCard({ parcel, isHighlighted }: { parcel: any, isHighlighted: boolean }) {
  const { mutate: verifyVoice, isPending: isCalling } = useInitiateVoiceVerification();
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "connected" | "verified">("idle");
  const [activeStep, setActiveStep] = useState(0);

  // Status mapping to steps
  const steps = ["registered", "received", "shipped", "delivered"];
  const currentStepIndex = steps.indexOf(parcel.status) > -1 ? steps.indexOf(parcel.status) : 0;

  const handleVerification = () => {
    setCallStatus("calling");
    // Simulate API call and voice interaction flow
    setTimeout(() => {
      setCallStatus("connected");
      setTimeout(() => {
        verifyVoice(parcel.id, {
          onSuccess: () => setCallStatus("verified"),
          onError: () => setCallStatus("idle") // Reset on fail
        });
      }, 3000); // Simulate 3s call
    }, 2000); // Simulate ringing
  };

  return (
    <Card className={`overflow-hidden border-2 ${isHighlighted ? "border-accent ring-4 ring-accent/10" : "border-transparent"} shadow-lg transition-all duration-500`}>
      <CardHeader className="bg-secondary/30 pb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-white">#{parcel.id}</Badge>
              <h3 className="text-xl font-bold font-mono text-primary">{parcel.trackingNumber}</h3>
            </div>
            <p className="text-muted-foreground mt-1">{parcel.description}</p>
          </div>
          {parcel.status === "registered" && !parcel.isVoiceVerified && (
            <div className="flex flex-col items-end gap-2">
              <Badge variant="destructive" className="animate-pulse">Verification Required</Badge>
              <DialogVerification 
                status={callStatus} 
                onStart={handleVerification} 
              />
            </div>
          )}
          {parcel.isVoiceVerified && (
            <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" /> Verified</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-8">
        {/* Timeline */}
        <div className="relative flex justify-between mb-8 px-4">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0" />
          
          {/* Active Progress Bar */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 1, ease: "circOut" }}
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0" 
          />

          {[
            { icon: Package, label: "Registered" },
            { icon: MapPin, label: "Warehouse" },
            { icon: Plane, label: "Shipped" },
            { icon: Truck, label: "Delivered" },
          ].map((step, i) => {
            const isActive = i <= currentStepIndex;
            return (
              <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${isActive ? "bg-white border-primary text-primary" : "bg-gray-100 border-gray-100 text-gray-400"}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-gray-400"}`}>{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-secondary/20 p-4 rounded-lg">
          <div>
            <span className="text-muted-foreground block mb-1">Weight</span>
            <span className="font-semibold">{parcel.weight || "--"} kg</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Est. Cost</span>
            <span className="font-semibold">₹{parcel.codAmount || "--"}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Created</span>
            <span className="font-semibold">{new Date(parcel.createdAt).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Status</span>
            <span className="font-semibold capitalize">{parcel.status.replace("_", " ")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DialogVerification({ status, onStart }: { status: string, onStart: () => void }) {
  return (
    <Button 
      onClick={onStart}
      disabled={status !== "idle"}
      className={`min-w-[140px] transition-all duration-300 ${status === "calling" ? "bg-yellow-500" : status === "connected" ? "bg-green-500" : status === "verified" ? "bg-blue-500" : "bg-accent"}`}
    >
      {status === "idle" && <><PhoneCall className="w-4 h-4 mr-2" /> Verify Order</>}
      {status === "calling" && <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Dialing...</>}
      {status === "connected" && <><Mic className="w-4 h-4 mr-2 animate-pulse" /> Listening...</>}
      {status === "verified" && <><CheckCircle2 className="w-4 h-4 mr-2" /> Verified</>}
    </Button>
  );
}
