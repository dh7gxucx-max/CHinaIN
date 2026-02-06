import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { validateLogin } from "@/lib/demoAccounts";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate login credentials
    setTimeout(() => {
      if (email && password) {
        // Check against demo accounts
        const validAccount = validateLogin(email, password);

        if (validAccount) {
          // Valid credentials - save to localStorage
          const demoUser = {
            firstName: validAccount.firstName,
            lastName: validAccount.lastName,
            email: validAccount.email,
            phone: validAccount.phone,
            id: validAccount.id,
          };

          localStorage.setItem('demoUser', JSON.stringify(demoUser));

          toast({
            title: "Login Successful!",
            description: `Welcome back, ${demoUser.firstName}!`,
          });

          // Redirect to dashboard
          fetch("/api/login", { method: "GET" })
            .then(() => {
              setTimeout(() => {
                setLocation("/dashboard");
              }, 500);
            })
            .catch(() => {
              setTimeout(() => {
                setLocation("/dashboard");
              }, 500);
            });
        } else {
          // Invalid credentials
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-2 font-display font-bold text-2xl mb-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Package className="h-6 w-6 text-accent" />
              <span className="text-primary">China<span className="text-accent">2</span>India</span>
            </div>
          </Link>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card className="shadow-2xl border-t-4 border-t-accent">
          <CardHeader className="text-center">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-7 h-7 text-accent" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Remember me</span>
                </label>
                <Link href="/forgot-password">
                  <span className="text-accent hover:text-accent/80 cursor-pointer">
                    Forgot password?
                  </span>
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>{" "}
              <Link href="/register">
                <span className="text-accent hover:text-accent/80 font-semibold cursor-pointer">
                  Sign up now
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms">
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
            </Link>{" "}
            and{" "}
            <Link href="/privacy">
              <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
