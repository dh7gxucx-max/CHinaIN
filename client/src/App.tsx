import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { SipWidget } from "@/components/SipWidget";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Stores from "@/pages/Stores";
import Tracking from "@/pages/Tracking";
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    window.location.href = "/api/login";
    return null;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/stores" component={Stores} />
          
          {/* Protected Routes */}
          <Route path="/dashboard">
            {() => <ProtectedRoute component={Dashboard} />}
          </Route>
          <Route path="/tracking">
            {() => <ProtectedRoute component={Tracking} />}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </main>
      <SipWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
