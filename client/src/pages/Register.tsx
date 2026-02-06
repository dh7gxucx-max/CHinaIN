import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { isEmailRegistered, registerNewAccount } from "@/lib/demoAccounts";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check if email is already registered
    if (isEmailRegistered(formData.email)) {
      toast({
        title: "Email Already Registered",
        description: "This email is already in use. Please login instead.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Register new account
    setTimeout(() => {
      // Register account in localStorage "database"
      const newAccount = registerNewAccount({
        email: formData.email,
        password: formData.password,
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        phone: formData.phone,
      });

      // Save current user session
      const demoUser = {
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
        email: newAccount.email,
        phone: newAccount.phone,
        id: newAccount.id,
      };
      localStorage.setItem('demoUser', JSON.stringify(demoUser));

      toast({
        title: "Registration Successful!",
        description: `Welcome to China2India, ${demoUser.firstName}! Your account has been created.`,
      });

      // First trigger mock login, then redirect to dashboard
      fetch("/api/login", { method: "GET" })
        .then(() => {
          setTimeout(() => {
            setLocation("/dashboard");
          }, 500);
        })
        .catch(() => {
          // Fallback: redirect to dashboard anyway
          setTimeout(() => {
            setLocation("/dashboard");
          }, 500);
        });
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
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <Card className="shadow-2xl border-t-4 border-t-accent">
          <CardHeader className="text-center">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-7 h-7 text-accent" />
            </div>
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>
              Join thousands shipping from China to India
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Rajesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 rounded border-gray-300"
                  required
                />
                <label htmlFor="terms" className="text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms">
                    <span className="text-accent hover:underline cursor-pointer">Terms of Service</span>
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy">
                    <span className="text-accent hover:underline cursor-pointer">Privacy Policy</span>
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{" "}
              <Link href="/login">
                <span className="text-accent hover:text-accent/80 font-semibold cursor-pointer">
                  Sign in
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
