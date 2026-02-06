import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Package, Plane, Ship, Truck, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Pricing() {
  const shippingMethods = [
    {
      icon: Plane,
      name: "Air Cargo Express",
      time: "5-7 days",
      price: "$18/kg",
      method: "air-express",
      features: [
        "Fastest delivery option",
        "Door-to-door service",
        "Real-time tracking",
        "Insurance included",
        "Priority customs clearance",
        "Suitable for urgent shipments"
      ],
      notIncluded: [
        "Not suitable for heavy cargo",
        "Limited to 50kg per shipment"
      ],
      color: "bg-blue-500"
    },
    {
      icon: Plane,
      name: "Air Cargo Standard",
      time: "8-12 days",
      price: "$15/kg",
      method: "air-standard",
      features: [
        "Balance of speed and cost",
        "Door-to-door service",
        "Real-time tracking",
        "Insurance included",
        "Standard customs clearance",
        "Best value for most shipments"
      ],
      notIncluded: [
        "Slightly slower than express"
      ],
      color: "bg-primary",
      recommended: true
    },
    {
      icon: Ship,
      name: "Sea Freight (FCL/LCL)",
      time: "25-35 days",
      price: "$8/kg",
      method: "sea-freight",
      features: [
        "Most economical option",
        "Suitable for heavy cargo",
        "No weight restrictions",
        "Full container load (FCL) available",
        "Less than container load (LCL) available",
        "Port-to-port or door-to-door"
      ],
      notIncluded: [
        "Longer transit time",
        "Requires larger shipments for best rates"
      ],
      color: "bg-teal-500"
    },
    {
      icon: Truck,
      name: "Land + Sea Express",
      time: "18-22 days",
      price: "$12/kg",
      method: "land-sea",
      features: [
        "Good balance option",
        "Land transport to port",
        "Sea freight to India",
        "Door-to-door service",
        "Suitable for medium cargo",
        "Cost-effective for bulk"
      ],
      notIncluded: [
        "Limited to specific routes"
      ],
      color: "bg-green-500"
    }
  ];

  const additionalServices = [
    {
      name: "Quality Inspection",
      description: "Professional inspection of goods before shipping",
      price: "$20-50",
      per: "per order"
    },
    {
      name: "Product Photography",
      description: "Detailed photos of your items for verification",
      price: "$5-15",
      per: "per item"
    },
    {
      name: "Repackaging Service",
      description: "Remove Chinese branding, repack items securely",
      price: "$10-30",
      per: "per box"
    },
    {
      name: "Consolidation",
      description: "Combine multiple packages into one shipment",
      price: "Free",
      per: "unlimited"
    },
    {
      name: "Storage (30 days)",
      description: "Free storage at our warehouse for first month",
      price: "Free",
      per: "first 30 days"
    },
    {
      name: "Extended Storage",
      description: "Additional storage beyond 30 days",
      price: "$2/kg",
      per: "per month"
    }
  ];

  const faqs = [
    {
      q: "How is shipping cost calculated?",
      a: "Shipping cost = Weight (kg) × Rate per kg. We use volumetric weight formula: (Length × Width × Height cm) ÷ 5000. Whichever is higher - actual or volumetric weight - is used for billing."
    },
    {
      q: "Are there any additional customs fees?",
      a: "Yes, Indian customs may charge import duty (typically 10-30% of product value depending on category). We'll help you understand the duties before shipping."
    },
    {
      q: "What items cannot be shipped?",
      a: "Prohibited items include: liquids, batteries (some exceptions), weapons, hazardous materials, branded replicas, food items without proper documentation. Contact us for specific item queries."
    },
    {
      q: "Do you offer insurance?",
      a: "Yes! Insurance is included with Air Cargo. For Sea Freight, insurance is available at 2% of declared value. We recommend insurance for valuable items."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept UPI, bank transfer, debit/credit cards, and Cash on Delivery (COD) for eligible orders with voice verification."
    },
    {
      q: "Can I consolidate orders from multiple Taobao sellers?",
      a: "Absolutely! That's one of our key features. We'll receive all your packages, consolidate them into one box, and ship together - saving you significant shipping costs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              No hidden fees. No surprises. Just honest, straightforward pricing for your China to India shipments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Choose Your Shipping Method</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the shipping option that best fits your timeline and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingMethods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`relative h-full ${method.recommended ? 'border-2 border-accent shadow-2xl' : 'border shadow-lg'}`}>
                  {method.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className={`w-14 h-14 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <method.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{method.name}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2 mt-2">
                      <Clock className="w-4 h-4" />
                      {method.time}
                    </CardDescription>
                    <div className="text-3xl font-bold text-primary mt-4">
                      {method.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {method.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {method.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`/calculator?method=${method.method}`}>
                      <Button className="w-full" variant={method.recommended ? "default" : "outline"}>
                        Calculate Cost
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Optional value-added services to enhance your shipping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start justify-between">
                      <span>{service.name}</span>
                      <Shield className="w-5 h-5 text-accent flex-shrink-0" />
                    </CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-primary">{service.price}</span>
                      <span className="text-sm text-muted-foreground">{service.per}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Examples */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Pricing Examples</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world examples to help you estimate your shipping costs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle>Small Package</CardTitle>
                <CardDescription>Clothing, accessories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <span className="font-semibold">2 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Method:</span>
                    <span className="font-semibold">Air Standard</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold text-primary">
                    <span>Total:</span>
                    <span>$30</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-accent">
              <CardHeader>
                <CardTitle>Medium Package</CardTitle>
                <CardDescription>Electronics, shoes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <span className="font-semibold">5 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Method:</span>
                    <span className="font-semibold">Air Standard</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold text-primary">
                    <span>Total:</span>
                    <span>$75</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <CardTitle>Large Package</CardTitle>
                <CardDescription>Furniture, bulk items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Weight:</span>
                    <span className="font-semibold">20 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Method:</span>
                    <span className="font-semibold">Sea Freight</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold text-primary">
                    <span>Total:</span>
                    <span>$160</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing and services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <Card className="bg-gradient-to-r from-primary to-blue-900 text-white border-none shadow-2xl overflow-hidden">
            <CardContent className="py-8 px-6 md:py-10 md:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    Ready to Start Shipping?
                  </h2>
                  <p className="text-blue-100 text-sm md:text-base">
                    Calculate your exact shipping cost or contact our team for a custom quote
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link href="/calculator">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold whitespace-nowrap">
                      Calculate Shipping Cost
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold whitespace-nowrap">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
