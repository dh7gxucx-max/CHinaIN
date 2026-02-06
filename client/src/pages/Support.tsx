import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Headphones, Mail, MessageCircle, Phone, Clock, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Support() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Shipping times vary by method: Air Express (5-7 days), Air Standard (8-12 days), Sea Freight (25-35 days), and Land+Sea (18-22 days). All times are from our Guangzhou warehouse to your door in India.",
    },
    {
      q: "How do I track my parcel?",
      a: "Once your parcel arrives at our warehouse, you'll receive a tracking number via email. You can track your shipment in real-time through your Dashboard or our Tracking page.",
    },
    {
      q: "What items are prohibited?",
      a: "We cannot ship weapons, explosives, hazardous materials, illegal substances, counterfeit goods, or live animals. Please check our full prohibited items list before ordering.",
    },
    {
      q: "Do you handle customs clearance?",
      a: "Yes! We handle all customs clearance and documentation for you. Our service includes customs duties and taxes, so there are no surprise charges at delivery.",
    },
    {
      q: "Can I consolidate multiple orders?",
      a: "Absolutely! We can consolidate multiple Taobao/1688 orders into one shipment to save you up to 70% on shipping costs. Just use your unique warehouse address for all purchases.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept credit cards, debit cards, UPI, net banking, and Cash on Delivery (COD) for eligible customers with good Trust Scores.",
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "+91 98765 43210",
      detail: "Mon-Sat: 9 AM - 7 PM IST",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@china2india.com",
      detail: "Response within 24 hours",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      detail: "Available 9 AM - 7 PM IST",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: MapPin,
      title: "Warehouse",
      description: "Guangzhou, China",
      detail: "Building 3, Industrial Road",
      color: "bg-orange-50 text-orange-600",
    },
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
              <Headphones className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              How Can We Help?
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our support team is here to assist you with any questions about shipping from China to India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-14 h-14 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <method.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription className="font-semibold text-foreground">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      {method.detail}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground">
                    Quick answers to common questions about our services.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Customer Support</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 7:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="font-medium">10:00 AM - 5:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Warehouse Operations</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Saturday:</span>
                      <span className="font-medium">24/7 Operations</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package Processing:</span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Flight:</span>
                      <span className="font-medium">Daily at 11:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
