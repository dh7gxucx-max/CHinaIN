import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";
import { useParcels, useCreateParcel } from "@/hooks/use-parcels";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Plus, Package, MapPin, TrendingUp, AlertCircle, Loader2, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyParcelsState } from "@/components/dashboard/EmptyParcelsState";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Schema definition (moved from deleted schema file)
const createParcelFormSchema = z.object({
  userId: z.string(),
  trackingNumber: z.string(),
  description: z.string().optional(),
  weight: z.string().optional(),
  status: z.string().default('registered'),
  codAmount: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
});
type CreateParcelForm = z.infer<typeof createParcelFormSchema>;

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useProfile();
  const { data: parcels, isLoading: isParcelsLoading, error: parcelsError, refetch: refetchParcels } = useParcels();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [addParcelOpen, setAddParcelOpen] = useState(false);

  // Load demo user from localStorage or create new one
  const getDemoUser = () => {
    if (user) return user;

    const stored = localStorage.getItem('demoUser');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse demo user', e);
      }
    }

    return { firstName: "Demo User", email: "demo@example.com", id: "demo-123" };
  };

  const mockUser = getDemoUser();

  // Save demo user to localStorage when on dashboard
  useEffect(() => {
    if (!user) {
      localStorage.setItem('demoUser', JSON.stringify(mockUser));
    }
  }, [user, mockUser]);
  const mockProfile = profile || {
    id: 1,
    userId: "demo-123",
    trustScore: 75,
    codLimit: 15000,
    chineseAddress: "黑龙江省鸡西市鸡冠区东太三组义立国际圣邮库一八111118",
    receiverName: "DP一八()",
    phone: "13136947557"
  };
  const mockParcels = parcels || [];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Address copied to clipboard." });
  };

  // Loading state (only for authenticated users)
  if (user && (isProfileLoading || isParcelsLoading)) {
    return <DashboardSkeleton />;
  }

  // Error state
  if (user && (profileError || parcelsError)) {
    return (
      <ErrorState
        title="Unable to load dashboard"
        message="We're having trouble loading your dashboard data. This might be a temporary issue."
        onRetry={() => {
          if (profileError) window.location.reload();
          if (parcelsError) refetchParcels();
        }}
      />
    );
  }

  // Calculate stats
  const pendingParcels = mockParcels?.filter(p => p.status === 'registered' || p.status === 'weighing').length || 0;
  const inTransit = mockParcels?.filter(p => p.status === 'shipped' || p.status === 'ready_to_ship').length || 0;

  return (
    <div className="container py-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">
            Welcome back, {mockUser.firstName}!
          </h1>
          <p className="text-muted-foreground">Manage your shipments and profile.</p>
        </div>
        <AddParcelDialog open={addParcelOpen} onOpenChange={setAddParcelOpen} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Chinese Address Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-primary to-blue-900 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <MapPin className="h-5 w-5" /> Your Warehouse Address
            </CardTitle>
            <CardDescription className="text-blue-200">
              Use this address when shopping on Taobao, 1688, or Alibaba.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-2 text-sm flex-1">
                  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                    <span className="text-blue-200/70">Name:</span>
                    <span className="text-white font-medium">{mockProfile?.receiverName || `DP一八()`}</span>

                    <span className="text-blue-200/70">Phone:</span>
                    <span className="text-white font-medium">{mockProfile?.phone || "13136947557"}</span>

                    <span className="text-blue-200/70">Address:</span>
                    <span className="text-white font-medium break-all">{mockProfile?.chineseAddress || "黑龙江省鸡西市鸡冠区东太三组义立国际圣邮库一八111118"}</span>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20 flex-shrink-0 mt-1"
                  onClick={() => copyToClipboard(`${mockProfile?.receiverName}\n${mockProfile?.phone}\n${mockProfile?.chineseAddress}`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200 bg-blue-950/50 p-2 rounded">
              <AlertCircle className="h-4 w-4 text-accent" />
              IMPORTANT: Always include your C2I ID so we can identify your package.
            </div>
          </CardContent>
        </Card>

        {/* Trust Score & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Trust Score</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-4" side="left">
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">How to increase your Trust Score:</p>
                        <ul className="space-y-1 text-xs">
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>Verify phone number (+10 points)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>Upload ID/KYC documents (+20 points)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>Complete 5 successful orders (+15 points)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>Link bank account (+10 points)</span>
                          </li>
                        </ul>
                        <p className="text-xs text-muted-foreground pt-2 border-t">
                          Higher score = Higher COD limit & priority support
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold text-primary">{mockProfile?.trustScore || 50}</div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${mockProfile?.trustScore || 50}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Higher score = Higher COD limit. Click ? to learn more.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{pendingParcels}</div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{inTransit}</div>
                <p className="text-xs text-muted-foreground">In Transit</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Parcels */}
      <div className="space-y-4">
        {mockParcels?.length === 0 ? (
          <EmptyParcelsState onAddParcel={() => setAddParcelOpen(true)} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">Recent Parcels</h2>
              <Button variant="link" onClick={() => setLocation("/tracking")}>View All</Button>
            </div>
          </>
        )}

        {mockParcels?.length > 0 && (
          <div className="grid gap-4">
            {mockParcels?.slice(0, 3).map((parcel) => (
              <motion.div
                key={parcel.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  #{parcel.id}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-primary">{parcel.trackingNumber}</h4>
                  <p className="text-sm text-muted-foreground truncate">{parcel.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase border ${getStatusColor(parcel.status)}`}>
                    {parcel.status.replace(/_/g, " ")}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setLocation(`/tracking?id=${parcel.id}`)}>
                    Track
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "registered": return "bg-blue-50 text-blue-700 border-blue-200";
    case "received": return "bg-purple-50 text-purple-700 border-purple-200";
    case "shipped": return "bg-orange-50 text-orange-700 border-orange-200";
    case "delivered": return "bg-green-50 text-green-700 border-green-200";
    default: return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

interface AddParcelDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function AddParcelDialog({ open: controlledOpen, onOpenChange }: AddParcelDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { mutate, isPending } = useCreateParcel();
  const { toast } = useToast();

  // Use controlled open if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  
  const form = useForm<CreateParcelForm>({
    resolver: zodResolver(createParcelFormSchema),
    defaultValues: {
      trackingNumber: "",
      description: "",
    }
  });

  const onSubmit = (data: CreateParcelForm) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast({ title: "Success", description: "Parcel registered successfully" });
      },
      onError: (err) => {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" /> Add Parcel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Incoming Parcel</DialogTitle>
          <DialogDescription>
            Enter the tracking number provided by your Chinese seller (Taobao/1688).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input 
              id="tracking" 
              placeholder="e.g. SF123456789" 
              {...form.register("trackingNumber")} 
            />
            {form.formState.errors.trackingNumber && (
              <p className="text-xs text-destructive">{form.formState.errors.trackingNumber.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea 
              id="desc" 
              placeholder="e.g. 5x Cotton T-Shirts, Blue" 
              {...form.register("description")} 
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Registering..." : "Register Parcel"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
