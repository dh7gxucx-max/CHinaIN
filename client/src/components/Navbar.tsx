import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Package, LayoutDashboard, ShoppingBag, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTickerData } from "@/lib/ticker";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [tickerData, setTickerData] = useState(() => getTickerData());
  const [demoUser, setDemoUser] = useState<any>(null);

  // Update demo user on mount and when location changes
  useEffect(() => {
    if (user) {
      setDemoUser(user);
    } else {
      try {
        const stored = localStorage.getItem('demoUser');
        setDemoUser(stored ? JSON.parse(stored) : null);
      } catch {
        setDemoUser(null);
      }
    }
  }, [user, location]);

  const displayUser = demoUser;

  useEffect(() => {
    // Update ticker data on mount and check daily
    const data = getTickerData();
    setTickerData(data);

    // Check for updates every hour
    const interval = setInterval(() => {
      const newData = getTickerData();
      setTickerData(newData);
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/calculator", label: "Calculator" },
    { href: "/pricing", label: "Pricing" },
    { href: "/support", label: "Support" },
  ];

  const authLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tracking", label: "My Parcels", icon: Package },
  ];

  // Check if user is logged in (authenticated or has demo session)
  const hasActiveSession = isAuthenticated || displayUser !== null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-5 w-5" />
          </div>
          <span>China<span className="text-accent">2</span>India</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`transition-colors hover:text-primary ${location === link.href ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center gap-3">
          {hasActiveSession ? (
            <div className="flex items-center gap-3">
              {/* User Name Display */}
              {displayUser && (
                <div className="text-sm flex items-center">
                  <span className="text-muted-foreground">Welcome, </span>
                  <span className="font-semibold text-primary ml-1">
                    {displayUser.firstName}
                  </span>
                </div>
              )}

              <Link href="/dashboard">
                <Button variant={location === "/dashboard" ? "secondary" : "ghost"} size="sm" className="h-9">
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={displayUser?.profileImageUrl || ""} alt={displayUser?.firstName || "User"} />
                      <AvatarFallback>{displayUser?.firstName?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal pb-3">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-semibold leading-none text-primary">
                        {displayUser?.firstName} {displayUser?.lastName || ''}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate" title={displayUser?.email}>
                        {displayUser?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {authLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="flex items-center cursor-pointer py-2">
                        <link.icon className="mr-3 h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem('demoUser');
                      if (isAuthenticated) {
                        logout();
                      } else {
                        // For demo users, just reload the page
                        window.location.href = '/';
                      }
                    }}
                    className="text-destructive focus:text-destructive cursor-pointer py-2"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium">
                      {link.label}
                    </Link>
                  ))}
                  {hasActiveSession && authLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-primary">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t pt-6">
                  {hasActiveSession ? (
                    <Button
                      onClick={() => {
                        localStorage.removeItem('demoUser');
                        if (isAuthenticated) {
                          logout();
                        } else {
                          // For demo users, just reload the page
                          window.location.href = '/';
                        }
                      }}
                      variant="outline"
                      className="w-full justify-start text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/register" className="w-full">
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Sign Up</Button>
                      </Link>
                      <Link href="/login" className="w-full">
                        <Button variant="outline" className="w-full">Log in</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Ticker Tape */}
      <div className="bg-primary text-primary-foreground py-1 overflow-hidden">
        <motion.div
          className="whitespace-nowrap text-xs font-mono flex items-center gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <span>EXCHANGE RATE: 1 CNY = {tickerData.exchangeRate} INR</span>
          <span>SHIPPING: AIR CARGO $15/KG</span>
          <span>NEXT FLIGHT: {tickerData.nextFlightDay} 23:00</span>
          <span>EXCHANGE RATE: 1 CNY = {tickerData.exchangeRate} INR</span>
          <span>SHIPPING: AIR CARGO $15/KG</span>
          <span>NEXT FLIGHT: {tickerData.nextFlightDay} 23:00</span>
        </motion.div>
      </div>
    </header>
  );
}
