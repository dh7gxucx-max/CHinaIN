import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Box, ShieldCheck, Truck, Headphones, Package, Calculator as CalcIcon } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary min-h-[600px] flex items-center justify-center">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="container relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-white space-y-8 text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full border-2 border-accent bg-accent/20 px-5 py-2 text-sm text-accent backdrop-blur-sm font-bold shadow-lg"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-2 w-2 rounded-full bg-accent mr-2 shadow-lg"
              ></motion.span>
              Fastest route to India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-tight text-white"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              Sourcing from China,{" "}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-accent block mt-2"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Made Simple.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              We handle procurement, quality checks, customs clearance, and last-mile delivery.
              Zero headaches, full transparency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 pt-4 justify-center"
            >
              <motion.a
                href={isAuthenticated ? "/dashboard" : "/api/login"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="h-14 px-10 text-base bg-accent hover:bg-accent/90 text-primary font-bold shadow-xl">
                  Start Shipping Now
                </Button>
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/calculator">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl font-semibold">
                    <CalcIcon className="mr-2 h-5 w-5" />
                    Calculate Shipping
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-primary mb-4">Why Choose Us?</h2>
            <p className="text-muted-foreground">We bridge the gap between Chinese marketplaces and Indian doorsteps with a comprehensive logistics network.</p>
          </motion.div>

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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
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
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:w-1/2 relative"
            >
              {/* Warehouse abstract image - utilizing Unsplash for context */}
              {/* warehouse logistics package sorting */}
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60"
                alt="Warehouse operations"
                className="rounded-2xl shadow-2xl z-10 relative"
              />
              <div className="absolute -bottom-6 -right-6 h-full w-full bg-accent/10 rounded-2xl -z-10 transform translate-x-4 translate-y-4"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:w-1/2 space-y-8"
            >
              <h2 className="text-3xl font-display font-bold text-primary">How It Works</h2>

              <div className="space-y-8">
                {[
                  { step: "01", title: "Sign Up & Get Address", desc: "Register to get your unique virtual address in our Guangzhou warehouse." },
                  { step: "02", title: "Shop Online", desc: "Buy from Taobao, 1688, or Alibaba and ship to your virtual address." },
                  { step: "03", title: "We Receive & Check", desc: "We receive your packages, inspect quality, and send you photos." },
                  { step: "04", title: "Ship to India", desc: "Select shipping method, pay online, and we deliver to your doorstep." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.25, duration: 0.8 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold font-mono">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Link href="/dashboard">
                <Button variant="link" className="text-primary p-0 h-auto font-semibold group">
                  Get your Chinese address <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-auto">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex items-center gap-2 font-display font-bold text-xl mb-4">
                <Package className="h-5 w-5 text-accent" />
                <span>China<span className="text-accent">2</span>India</span>
              </div>
              <p className="text-blue-200 text-sm">
                Your trusted partner for cross-border logistics. We make international shipping accessible for everyone.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link href="/calculator" className="hover:text-white">Shipping Calculator</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Shipping Rates</Link></li>
                <li><Link href="/tracking" className="hover:text-white">Track Parcel</Link></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h4 className="font-bold mb-4 text-accent">Legal</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h4 className="font-bold mb-4 text-accent">Contact</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center gap-2"><Headphones className="h-4 w-4" /> +91 98765 43210</li>
                <li className="flex items-center gap-2">support@china2india.com</li>
              </ul>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-blue-300"
          >
            © {new Date().getFullYear()} China2India Logistics. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
