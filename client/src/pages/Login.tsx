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

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button type="button" variant="outline" className="h-12">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" className="h-12">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Facebook
                </Button>
              </div>
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

        {/* Demo Accounts Info */}
        <Card className="mt-8 border-accent/30 bg-accent/5">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <p className="text-sm font-semibold text-primary mb-2">
                🎯 Demo Accounts for Testing
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                Use one of these accounts to try the platform
              </p>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="text-muted-foreground">or</span>
                <Link href="/register">
                  <span className="text-accent hover:text-accent/80 font-semibold cursor-pointer underline">
                    create your own account
                  </span>
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-background p-3 rounded-lg border">
                <p className="font-mono">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-semibold">demo@china2india.com</span>
                </p>
                <p className="font-mono">
                  <span className="text-muted-foreground">Password:</span>{" "}
                  <span className="font-semibold">demo123</span>
                </p>
              </div>
              <div className="bg-background p-3 rounded-lg border">
                <p className="font-mono">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-semibold">test@example.com</span>
                </p>
                <p className="font-mono">
                  <span className="text-muted-foreground">Password:</span>{" "}
                  <span className="font-semibold">test123</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
