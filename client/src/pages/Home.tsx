import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calculator } from "@/components/Calculator";
import { motion } from "framer-motion";
import { ArrowRight, Box, ShieldCheck, Truck, Headphones, Package } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>
        
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              Fastest route to India
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight">
              Sourcing from China, <br />
              <span className="text-accent">Made Simple.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-lg leading-relaxed">
              We handle procurement, quality checks, customs clearance, and last-mile delivery. 
              Zero headaches, full transparency.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href={isAuthenticated ? "/dashboard" : "/api/login"}>
                <Button size="lg" className="h-12 px-8 text-base bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  Start Shipping Now
                </Button>
              </a>
              <Link href="/stores">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-white/20 text-white hover:bg-white/10">
                  Browse Stores
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <Calculator />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground">We bridge the gap between Chinese marketplaces and Indian doorsteps with a comprehensive logistics network.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Voice Verification", 
                desc: "Every COD order is verified via our automated voice system to prevent fraud and ensure delivery."
              },
              { 
                icon: Box, 
                title: "Consolidated Shipping", 
                desc: "Shop from multiple Taobao/1688 stores. We combine them into one box to save you up to 70% on shipping."
              },
              { 
                icon: Truck, 
                title: "End-to-End Tracking", 
                desc: "Real-time updates from our warehouse in Guangzhou to your doorstep in Mumbai, Delhi, or anywhere in India."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl transition-shadow"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              {/* Warehouse abstract image - utilizing Unsplash for context */}
              {/* warehouse logistics package sorting */}
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60" 
                alt="Warehouse operations" 
                className="rounded-2xl shadow-2xl z-10 relative"
              />
              <div className="absolute -bottom-6 -right-6 h-full w-full bg-accent/10 rounded-2xl -z-10 transform translate-x-4 translate-y-4"></div>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl font-display font-bold text-primary">How It Works</h2>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Sign Up & Get Address", desc: "Register to get your unique virtual address in our Guangzhou warehouse." },
                  { step: "02", title: "Shop Online", desc: "Buy from Taobao, 1688, or Alibaba and ship to your virtual address." },
                  { step: "03", title: "We Receive & Check", desc: "We receive your packages, inspect quality, and send you photos." },
                  { step: "04", title: "Ship to India", desc: "Select shipping method, pay online, and we deliver to your doorstep." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold font-mono">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/dashboard">
                <Button variant="link" className="text-primary p-0 h-auto font-semibold group">
                  Get your Chinese address <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-auto">
        <div className="container grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <Package className="h-5 w-5 text-accent" />
              <span>China<span className="text-accent">2</span>India</span>
            </div>
            <p className="text-blue-200 text-sm">
              Your trusted partner for cross-border logistics. We make international shipping accessible for everyone.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/stores" className="hover:text-white">Store Directory</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Shipping Rates</Link></li>
              <li><Link href="/tracking" className="hover:text-white">Track Parcel</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent">Legal</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent">Contact</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-center gap-2"><Headphones className="h-4 w-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2">support@china2india.com</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-white/10 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} China2India Logistics. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
