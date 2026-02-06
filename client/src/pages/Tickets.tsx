import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { format } from "date-fns";

interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
}

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Load tickets from localStorage
    const savedTickets = localStorage.getItem('supportTickets');
    if (savedTickets) {
      try {
        setTickets(JSON.parse(savedTickets));
      } catch (e) {
        console.error('Failed to parse tickets', e);
      }
    }
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'closed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

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
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              My Support Tickets
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Track and manage all your support requests in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tickets List */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-primary">All Tickets</h2>
              <p className="text-sm text-muted-foreground">
                {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'} total
              </p>
            </div>
            <Link href="/support">
              <Button>Create New Ticket</Button>
            </Link>
          </div>

          {tickets.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center">
                <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Tickets Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't created any support tickets. Need help?
                </p>
                <Link href="/support">
                  <Button>Create Your First Ticket</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket, i) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">
                              #{ticket.id}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(ticket.status)} flex items-center gap-1`}
                            >
                              {getStatusIcon(ticket.status)}
                              {ticket.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                          <CardDescription className="text-base font-semibold text-foreground">
                            {ticket.subject}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-1 justify-end">
                            <Clock className="w-3 h-3" />
                            {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
                          </div>
                          <div className="text-xs">
                            {format(new Date(ticket.createdAt), 'hh:mm a')}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-semibold">From:</span> {ticket.name} ({ticket.email})
                        </div>
                        <div className="text-sm bg-secondary/30 p-4 rounded-lg">
                          <p className="line-clamp-2">{ticket.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
