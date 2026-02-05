import { AlertCircle, RefreshCw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showSupport?: boolean;
}

export function ErrorState({
  title = "Oops! Something went wrong",
  message = "We're having trouble loading this page. Please try again.",
  onRetry,
  showSupport = true,
}: ErrorStateProps) {
  return (
    <div className="container py-20">
      <Card className="max-w-lg mx-auto border-destructive/50">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">{title}</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            {onRetry && (
              <Button
                onClick={onRetry}
                className="gap-2"
                size="lg"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            {showSupport && (
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => window.location.href = "/support"}
              >
                <Headphones className="h-4 w-4" />
                Contact Support
              </Button>
            )}
          </div>

          <div className="pt-4 text-sm text-muted-foreground">
            <p>Error persisting? Our support team is here to help.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
