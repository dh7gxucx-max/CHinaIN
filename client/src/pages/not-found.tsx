import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center border-2 border-border/50 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 justify-center">
            <AlertCircle className="h-12 w-12 text-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold text-primary mb-2">404 Page Not Found</h1>
          <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
            The shipment you are looking for seems to have gotten lost in the logistics network.
          </p>
          <div className="mt-8">
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
